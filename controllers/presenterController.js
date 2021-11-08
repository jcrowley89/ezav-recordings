const crypto = require("crypto");
const { Presenter, Program } = require("../db/models");

exports.index = async (req, res) => {
  const presenters = await Presenter.findAll({
    include: {
      model: Program,
    },
    order: [["lastName", "ASC"], ["firstName", "ASC"]],
  });
  results = presenters.map((p) => {
    return {
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      programId: p.programId,
      eventTitle: p.Program.eventTitle,
      clientName: p.Program.clientName,
      code: p.code,
    };
  });
  res.json(results);
};

exports.create = async (req, res) => {
  const { firstName, lastName, email, programId } = req.body;
  const presenter = await Presenter.findOne({ where: { email: email}});
  if (presenter) return res.status(409).json({msg: "Email already taken"});
  await Presenter.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    code: crypto.randomBytes(6).toString("base64").toUpperCase(),
    ProgramId: programId,
  });
  return res.json({ msg: "Success" });
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const presenter = await Presenter.findByPk(id);
  res.json(presenter);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Presenter.update(req.body, { where: { id: id } });
  res.json({ msg: "Update successful" });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Presenter.destroy({ where: { id: id } });
  res.json({ msg: "Success" });
};
