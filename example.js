const mongoLite = require('mongo-database');
const mongoose = require('mongoose');

async function main() {
  // Connect to the embedded MongoDB server with a specified database name
  await mongoLite.connectToDatabase("mongo-database");
  console.log("Connected to the embedded MongoDB database.");

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
