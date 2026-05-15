const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function connectToDatabase(dbName = "DefaultDatabase") {

  try {

    const { MongoMemoryServer } = require("mongodb-memory-server");

    // bsondb paths
    const portablePath = path.join(process.cwd(), "bsondb");

    const dbPath = path.join(portablePath, "data");

    const binaryPath = path.join(portablePath, "bin");

    // Create data folder if not exists
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }

    // MongoDB Binary Path
    const mongodBinary = path.join(binaryPath, "mongod.exe");

    // Start MongoDB
    const mongod = new MongoMemoryServer({

      instance: {
        dbName,
        dbPath,
        storageEngine: "wiredTiger",
        port: 27017,
      },

      binary: {
        version: "4.0.28",
        systemBinary: mongodBinary,
      },

      autoStart: false,

    });

    await mongod.start();

    // Get Mongo URI
    const mongoUri = mongod.getUri();

    console.log("MongoDB URI:", mongoUri);

    // Connect mongoose
    await mongoose.connect(mongoUri, {
      dbName,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected successfully to database: ${dbName}`);

  } catch (err) {

    console.error("Error connecting to MongoDB:", err);

    throw err;

  }

}

module.exports = connectToDatabase;