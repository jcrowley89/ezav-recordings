if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin, Presenter } = require("../db/models");

const tokenExp = "7d";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ where: { email: email.toLowerCase() } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const presenter = await Presenter.findOne({ where: { email: email.toLowerCase() } });
    if (!presenter || presenter.code !== password) {
      res.status(401).json({ msg: "Incorrect email or password." });
      return;
    }
    const token = jwt.sign(
      { id: presenter.id, role: "presenter" },
      process.env.TOKEN_SECRET,
      { expiresIn: tokenExp }
    );
    res.json({
      user: {
        id: presenter.id,
        firstName: presenter.firstName,
        lastName: presenter.lastName,
        email: presenter.email,
        role: "presenter",
        programId: presenter.programId,
      },
      token: token,
    });
    return;
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: tokenExp }
  );
  res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token: token,
  });
};

exports.getCurrentUser = async (req, res) => {
  let token = req.headers["x-access-token"]?.split(" ")[1];;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    if (decoded.role === "admin" || decoded.role === "developer") {
      Admin.findOne({ where: { id: decoded.id } }).then((user) => {
        res.json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        });
      });
    } else {
      Presenter.findOne({
        where: { id: decoded.id },
      }).then((presenter) => {
        res.json({
          user: {
            id: presenter.id,
            firstName: presenter.firstName,
            lastName: presenter.lastName,
            email: presenter.email,
            role: "presenter",
            programId: presenter.ProgramId,
          },
        });
      });
    }
  });
};
