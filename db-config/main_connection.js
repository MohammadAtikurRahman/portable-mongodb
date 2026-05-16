const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod = null;

async function startDatabase(dbName = "DefaultDatabase") {
  const dbPath = path.join(__dirname, "data");
  const binaryPath = path.join(__dirname, "bin", "mongod.exe");

  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  mongod = new MongoMemoryServer({
    instance: {
      dbName,
      dbPath,
      storageEngine: "wiredTiger",
      port: 27017,
    },
    binary: {
      version: "4.0.28",
      systemBinary: binaryPath,
    },
    autoStart: false,
  });

  await mongod.start();

  const mongoUri = mongod.getUri();

  await mongoose.connect(mongoUri, {
    dbName,
    serverSelectionTimeoutMS: 5000,
  });

  console.log(`MongoDB connected: ${dbName}`);
}

async function stopDatabase(server) {
  console.log("Shutting down...");

  await mongoose.disconnect();

  if (mongod) {
    await mongod.stop();
  }

  if (server) {
    server.close(() => {
      console.log("Server shut down.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function setupShutdown(server) {
  process.on("SIGINT", async () => {
    await stopDatabase(server);
  });

  process.on("SIGTERM", async () => {
    await stopDatabase(server);
  });
}

module.exports = {
  startDatabase,
  setupShutdown,
};