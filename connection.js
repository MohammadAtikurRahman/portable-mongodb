const mongoose = require("mongoose");

async function connectToDatabase(dbName = "DefaultDatabase") {
  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const path = require("path");
    const dbPath = path.join(__dirname, "./mongodb-data");
    const binaryPath = path.join(__dirname, "./mongodb-binaries");

    // Set the MongoDB binary path
    process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryPath, "mongod.exe");

    const mongod = new MongoMemoryServer({
      instance: {
        dbName,        // Use the database name provided by the user
        dbPath: dbPath,
        storageEngine: "wiredTiger",
        port: 27017,
      },
      binary: {
        version: "4.0.28",
        downloadDir: binaryPath,
        mongodBinaryPath: path.join(binaryPath, "mongod.exe"),
        skipMD5: true,
        debug: false,
        autoDownload: false,
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
