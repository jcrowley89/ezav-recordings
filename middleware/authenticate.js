if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ isLoggedIn: false, msg: "Failed to Authenticate" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isLoggedIn: false, msg: "Failed to Authenticate" });
    }
    req.user = {};
    req.user.id = decoded.id;
    req.user.role = decoded.role;
    next();
  });
}

module.exports = authenticate;
