# Portable Mongodb

**Portable Mongodb** is a fully portable MongoDB server for Node.js that runs without requiring separate MongoDB installation. This package includes all necessary binaries and data directories, making it easy to integrate a MongoDB server into your Node.js projects with minimal setup.

## Features

- **No Installation Required**: Run MongoDB without needing to download and install it separately.
- **Embedded MongoDB Server**: Integrated directly into your Node.js application.
- **Portable**: Easily share and run projects across different environments.
- **Data Persistence**: Maintain data between sessions without losing information.
- **No Environment Setup Required**: No need to set up environment variables on Windows.

## Compatibility and Supported Environments

This project uses `mongodb-memory-server` to run an embedded MongoDB instance with a specified binary version and path. The configuration relies on the `mongod.exe` binary path and `autoDownload` for automatic binary fetching, but certain OS restrictions apply.

### Supported Environments

| Operating System           | Notes                                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| **Windows**                | Fully supported as `process.env.MONGOMS_SYSTEM_BINARY` explicitly points to `mongod.exe`, a Windows binary. |
| **MacOS (Intel)**          | Supported if `autoDownload` successfully fetches a compatible MongoDB binary for MacOS.                     |
| **Linux (up to Debian 11)** | Supported on older Linux distributions that offer MongoDB binaries below version `7.0.3`.                   |

### Not Supported Environments

| Operating System                    | Reason                                                                                                      |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Linux (Debian 12+)**              | MongoDB does not provide binaries for versions before `7.0.3` on Debian 12+. The specified version `4.0.28` will not work. |
| **MacOS (Apple Silicon)**           | May not be supported due to lack of compatibility with older MongoDB binaries (version `4.0.28`).           |
| **Cloud-based Environments** (e.g., CodeSandbox, Repl.it) | These often run Linux-based containers that may not support `mongod.exe` directly and require Linux-compatible binaries.  |

## Installation

Install the package using npm:

```bash
npm install portable-mongodb

```
Note: The installation of portable-mongodb may take approximately 4-7 minutes depending on your internet speed and system performance. This is due to the package size, as it includes essential MongoDB binaries to run an embedded MongoDB instance.

## Required Packages


```bash
npm install mongoose

```


```js
const portableMongo = require('portable-mongodb');
const mongoose = require('mongoose');

async function main() {
  // Connect to the embedded MongoDB server with a specified database name
  await portableMongo.connectToDatabase("portable-mongodb-database");
  console.log("Connected to the portable MongoDB database.");

  // Define a schema and model
  const messageSchema = new mongoose.Schema({
    message: String
  });

  const Message = mongoose.model("Message", messageSchema);

  // Insert a document with the message: "allahu akbar"
  const newMessage = new Message({ message: "Hello World" });
  await newMessage.save();

  console.log("Message inserted:", newMessage);

  // Retrieve and print the document to confirm it was added
  const messages = await Message.find();
  console.log("Retrieved messages:", messages);
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
