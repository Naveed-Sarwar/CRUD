const mongoose = require("mongoose");

const AddTodo = new mongoose.Schema({
  todo: { type: String },
  userId: {type: String},
});

module.exports = mongoose.model("AddTodo", AddTodo);
