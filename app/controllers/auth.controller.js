const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Retrieve all Tutorials from the database.
exports.register = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  delete user.dataValues.password;
  const token = jwt.sign({ ...user.dataValues }, process.env.APP_KEY, {
    expiresIn: "1h",
  });
  console.log(user.dataValues);
  res.json({ token, user: user.dataValues });
};
