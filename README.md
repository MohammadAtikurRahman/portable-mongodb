# Portable Mongodb

**portable-mongodb** is a fully portable MongoDB server for Node.js that runs without requiring separate MongoDB installation. This package includes all necessary binaries and data directories, making it easy to integrate a MongoDB server into your Node.js projects with minimal setup.

## Features

- **No Installation Required**: Run MongoDB without needing to download and install it separately.
- **Embedded MongoDB Server**: Integrated directly into your Node.js application.
- **Portable**: Easily share and run projects across different environments.
- **Data Persistence**: Maintain data between sessions without losing information.
- **No Environment Setup Required**: No need to set up environment variables on Windows.


## Installation

Install the package using npm:

```bash
npm install portable-mongodb

```


```js
const portableMongo = require('portable-mongodb');
const mongoose = require('mongoose');

async function main() {
  // Connect to the embedded MongoDB server with a specified database name
  await mongoLite.connectToDatabase("portable-mongodb-database");
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
