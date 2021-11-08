const sequelize = require("sequelize");
const { Recording, Presenter, Program, Flag } = require("../db/models");
const path = require("path");
const countSlides = require("../utils/countSlides");
const s3 = require("../utils/s3");

exports.index = async (req, res) => {
  const { id, role } = req.user;
  let recordings = await Recording.findAll({
    attributes: [
      "id",
      "presentationTitle",
      "createdAt",
      "updatedAt",
      "completedAt",
    ],
    include: {
      model: Presenter,
      include: [{ model: Program, attributes: ["eventTitle", "clientName"] }],
    },
  });

  if (role === "presenter") {
    const presenter = await Presenter.findByPk(id);
    recordings = recordings.filter(
      (r) => r.Presenter.ProgramId === presenter.ProgramId
    );
  }

  const results = recordings.map((r) => {
    return {
      id: r.id,
      presenterFirstName: r.Presenter.firstName,
      presenterLastName: r.Presenter.lastName,
      presentationTitle: r.presentationTitle,
      presenterId: r.Presenter.id,
      programId: r.Presenter.ProgramId,
      eventTitle: r.Presenter.Program.eventTitle,
      clientName: r.Presenter.Program.clientName,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      completedAt: r.completedAt,
    };
  });
  res.json(results);
};

exports.create = async (req, res) => {
  const { presentationTitle, presenterId, dateString } = req.body;
  const numSlides = await countSlides(
    `${req.file.fieldname}-${dateString}-out`
  );
  console.log(numSlides);
  const recording = await Recording.create({
    presentationTitle: presentationTitle,
    presentationFile: `${req.file.fieldname}-${dateString}${path.extname(
      req.file.originalname
    )}`,
    numSlides: numSlides,
    PresenterId: presenterId,
  });
  res.json(recording);
};

exports.getSubmitURL = async (req, res) => {
  const { key } = req.params;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "ezav-recordings",
      Key: key,
      Expires: 86400,
      ContentType: "video/webm",
    },
    (err, url) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      res.json({ url: url });
    }
  );
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const recording = await Recording.findByPk(id, {
    include: {
      model: Presenter,
      include: [{ model: Program, attributes: ["eventTitle", "clientName"] }],
    },
  });
  const flags = await Flag.findAll({
    where: {
      RecordingId: id,
    }
  });
  const flagsArr = flags.map(flag => flag.time);
  const result = {
    id: recording.id,
    presentationTitle: recording.presentationTitle,
    presenterId: recording.presenterId,
    presenterFirstName: recording.Presenter.firstName,
    presenterLastName: recording.Presenter.lastName,
    presenterEmail: recording.Presenter.email,
    presentationFile: recording.presentationFile,
    recordingFile: recording.recordingFile,
    flags: flagsArr,
    numSlides: recording.numSlides,
    programId: recording.Presenter.Program.id,
    eventTitle: recording.Presenter.Program.eventTitle,
    clientName: recording.Presenter.Program.clientName,
    completedAt: recording.completedAt,
    createdAt: recording.createdAt,
    updatedAt: recording.updatedAt,
  };
  res.json(result);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Recording.update(req.body, { where: { id: id } });
  if (req.body.flags) {
    const promises = req.body.flags.map(flag => {
      return Flag.create({
        RecordingId: id,
        time: flag,
      });
    });
    await Promise.all(promises);
  }
  res.json({ msg: "Update successful" });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Recording.destroy({ where: { id: id } });
  res.json({ msg: "Delete successful" });
};
