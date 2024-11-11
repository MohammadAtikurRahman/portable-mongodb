// index.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

/**
 * Provides a connected MongoDB instance and Mongoose setup for running operations,
 * and automatically stops the database after completion.
 *
 * @param {Object} options - Configuration options for MongoDB and Mongoose.
 * @param {string} options.dbName - The name of the database to use.
 * @param {number} options.port - The port to use for MongoDB.
 * @param {string} options.storageEngine - The storage engine for MongoDB (default: "wiredTiger").
 * @param {Function} callback - The function containing database operations to execute.
 * @returns {Promise<void>} - Resolves when the database is connected and operations are complete.
 */
async function withDatabase(options = {}, callback) {
  const {
    dbName = "DefaultDatabase",
    port = 27017,
    storageEngine = "wiredTiger",
  } = options;

  try {
    const dbPath = path.join(process.cwd(), "./mongodb-data");
    const binaryPath = path.join(process.cwd(), "./mongodb-binaries");

    // Ensure the mongodb-data directory exists
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }

    // Set the MongoDB binary path
    process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryPath, "mongod.exe");

    // Start MongoDB with specified options
    mongod = await MongoMemoryServer.create({
      instance: {
        dbName,
        dbPath: dbPath,
        storageEngine,
        port,
      },
      binary: {
        version: "7.0.15",
        downloadDir: binaryPath,
        autoDownload: true,
      },
    });

    const mongoUri = mongod.getUri();
    console.log(`MongoDB URI: ${mongoUri}`);

    // Connect mongoose to the in-memory instance
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      dbName, // Use the custom database name
    });

    console.log(`MongoDB connected successfully to database: ${dbName}`);

    // Run the provided callback with Mongoose available for operations
    await callback(mongoose);

  } catch (err) {
    console.error("Error during MongoDB operations:", err);
    throw err;
  } finally {
    // Clean up: disconnect and stop MongoDB
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
    console.log("MongoDB has been stopped.");
  }
}

export default withDatabase;
