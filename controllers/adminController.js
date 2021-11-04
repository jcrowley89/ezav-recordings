const { Admin } = require("../db/models");
const bcrypt = require("bcryptjs");

exports.index = async (req, res) => {
  const admins = await Admin.findAll({
    order: [["lastName", "ASC"], ["firstName", "ASC"]],
  });
  const results = admins.map((a) => {
    return {
      id: a.id,
      firstName: a.firstName,
      lastName: a.lastName,
      email: a.email,
      role: a.role,
    };
  });
  res.json(results);
};

exports.create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  await Admin.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: "admin",
    password: bcrypt.hashSync(password, 8),
  });
  res.json({ msg: "Admin User created successfully." });
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByPk(id);
  const result = {
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    role: admin.role,
  };
  res.json(result);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Admin.update(req.body, { where: { id: id } });
  res.json({ msg: "Update successful" });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Admin.destroy({ where: { id: id } });
  res.json({ msg: "Delete successful" });
};
