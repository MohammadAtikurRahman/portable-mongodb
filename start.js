import withDatabase from './index.js';

async function main() {
  // Define the configuration for the MongoDB instance
  const dbConfig = {
    dbName: 'myCustomDatabase', // Custom database name
    port: 27017,                // Custom port
    storageEngine: 'wiredTiger' // Custom storage engine (default: "wiredTiger")
  };

  // Run all database operations inside `withDatabase` using custom configuration
  await withDatabase(dbConfig, async (mongoose) => {
    // Define a Mongoose schema and model
    const TestSchema = new mongoose.Schema({ message: String });
    const TestModel = mongoose.model('Test', TestSchema);

    // Insert a "Hello World" document
    const result = await TestModel.create({ message: 'Hello World' });
    console.log(`Inserted document with _id: ${result._id}`);

    // Retrieve the "Hello World" document
    const document = await TestModel.findOne({ message: 'Hello World' });
    console.log('Found document:', document);
  });
}

main().catch(console.error);
