var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: String,
  user_age: Number,
  user_gender: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
