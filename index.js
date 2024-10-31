const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectToDatabase = require("./connection");
const User = require("./model/user.js");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/add_users", async (req, res) => {
  try {
    const { user_name, user_age, user_gender } = req.body;

    const newUser = new User({
      user_name,
      user_age,
      user_gender,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
});

app.get("/api/get_users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Start Express server
    const server = app.listen(2000, () => {
      console.log("Server is running on port 2000");
    });

    // Handle server shutdown to cleanup
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      await mongoose.disconnect();
      server.close();
      console.log("Server shut down.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
