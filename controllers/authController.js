const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  // Create new user
  const user = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await user.save();
    res.json({ user: savedUser._id });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Email not found" });

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: "Invalid password" });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).json({ token });
};
