const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const User = require("../models/users");

const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const newUser = new User({
    fullname: fullname,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  res.send(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLogging = await User.findOne({ email: email });

  if (!userLogging) {
    res.status(404).send("INCORRECT_USERNAME_OR_PASSWORD");
  }

  const match = await bcrypt.compare(password, userLogging.password);
  if (match) {
    const token = jwt.sign({ userId: userLogging._id }, JWT_SECRET);
    res.status(200).json({ token });
  } else {
    res.status(404).send("INCORRECT_USERNAME_OR_PASSWORD");
  }
};

module.exports = { login, register };
