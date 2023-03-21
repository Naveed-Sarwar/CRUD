const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});


var AuthModal = mongoose.model("users" , AuthSchema);
module.exports = AuthModal