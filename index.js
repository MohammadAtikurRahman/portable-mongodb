const express = require("express");
const cors = require("cors");

require("./connect");

const User = require("./model/user");

const app = express();

const port = 2000;

app.use(cors());
app.use(express.json());

app.post("/api/add_users", async (req, res) => {

  const user = await User.create(req.body);

  res.status(201).json(user);

});

app.get("/api/get_users", async (req, res) => {

  const users = await User.find();

  res.status(200).json(users);

});

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);

});