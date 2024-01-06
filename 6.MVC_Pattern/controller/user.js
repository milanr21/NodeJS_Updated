const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

// ===================MIDDLEWARES================================

exports.createuser = (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json({ type: "POST" });
};

exports.getAllUser = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const id = +req.params.id;

  const user = users.find((p) => p.id === id);

  res.json(user);
};

exports.updateUserUsingPut = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  users[userIndex] = req.body;
  res.status(201).json({ type: "PUT" });
};

exports.updateUserUsingPatch = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json({ type: "PATCH" });
};

exports.deleteUserById = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1);
  res.status(201).json({ type: "DELETE" });
};
