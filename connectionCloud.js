const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function connectToDatabase(dbName = "DefaultDatabase") {
  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const dbPath = path.join(__dirname, "./mongodb-data");

    // Ensure the mongodb-data directory exists
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }

    // Initialize MongoMemoryServer without specifying `MONGOMS_SYSTEM_BINARY`
    const mongod = new MongoMemoryServer({
      instance: {
        dbName,
        dbPath: dbPath,
        storageEngine: "wiredTiger",
        port: 27017,
      },
      binary: {
        version: "4.0.28",
        autoDownload: true, // Enable autoDownload for cross-platform support
      },
      autoStart: false,
    });

    await mongod.start();
    const mongoUri = await mongod.getUri();

    console.log("MongoDB In-Memory URI:", mongoUri);

    // Connect mongoose to the in-memory instance
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      dbName, // Connect to the specified database name
    });

    console.log(`MongoDB connected successfully to database: ${dbName}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = connectToDatabase;
