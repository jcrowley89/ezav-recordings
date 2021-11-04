const { Program } = require("../db/models");

exports.index = async (req, res) => {
  const programs = await Program.findAll({
    order: [["beginsOn", "ASC"]],
  });
  res.json(programs);
};

exports.create = (req, res) => {
  const { eventTitle, clientName, dateString, beginsOn, endsOn } = req.body;
  Program.create({
    eventTitle: eventTitle,
    clientName: clientName,
    logo: `logo-${dateString}`,
    frame: `frame-${dateString}`,
    beginsOn: new Date(beginsOn),
    endsOn: new Date(endsOn),
  });
  res.json({ msg: "Program created successfully." });
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const program = await Program.findByPk(id);
  res.json(program);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Program.update(req.body, { where: { id: id } });
  res.json({ msg: "Update successful" });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Program.destroy({ where: { id: id } });
  res.json({ msg: "Delete successful" });
};
