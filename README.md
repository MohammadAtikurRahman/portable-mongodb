# Portable Mongodb

**Portable Mongodb** is a fully portable MongoDB server for Node.js that runs without requiring separate MongoDB installation. This package includes all necessary binaries and data directories, making it easy to integrate a MongoDB server into your Node.js projects with minimal setup.

## Features

- **No Installation Required**: Run MongoDB without needing to download and install it separately.
- **Embedded MongoDB Server**: Integrated directly into your Node.js application.
- **Portable**: Easily share and run projects across different environments.
- **Data Persistence**: Maintain data between sessions without losing information.
- **No Environment Setup Required**: No need to set up environment variables on Windows.

## Compatibility and Supported Environments

### Supported Environments

| Operating System           |
|----------------------------|
| **Windows**                |

### Not Supported Environments

| Operating System                    |
|-------------------------------------|
| **MacOS (Intel)**                   |
| **MacOS (Apple Silicon)**           |
| **Linux** (all distributions, including Debian 11+) |
| **Cloud-based Environments** (e.g., CodeSandbox, Repl.it) |

## Installation

Install the package using npm:

```bash
npm install portable-mongodb

```
Note: The installation of portable-mongodb may take approximately 4-7 minutes depending on your internet speed and system performance. This is due to the package size, as it includes essential MongoDB binaries to run an embedded MongoDB instance.


```js
const portableMongo = require('portable-mongodb');

async function main() {
  // Define the configuration for the MongoDB instance
  const dbConfig = {
    dbName: 'myCustomDatabase', // Custom database name
    port: 27017,                // Custom port
    storageEngine: 'wiredTiger' // Custom storage engine (default: "wiredTiger")
  };

  // Run all database operations inside `withDatabase` using custom configuration
  await portableMongo.withDatabase(dbConfig, async (mongoose) => {
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


```

## Contributing

Contributions are welcome! If you find any issues or have feature requests, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

## Author

Developed by **Md. Atikur Rahman**.

## Support

For any questions or support, you can reach out via [GitHub Issues](https://github.com/MohammadAtikurRahman/portable-mongodb/issues).

---

Thank you for using **Portable Mongodb**! We hope it simplifies your development process.
