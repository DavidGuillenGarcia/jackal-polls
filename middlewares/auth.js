const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
