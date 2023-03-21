const express = require("express");
const app = express();
const router = express.Router();

const {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/TodoController");

router.post("/add", (req, res) => {
  addTodo(req, res);
});
router.get("/", (req, res) => {
  getTodo(req, res);
});

router.delete("/delete/:id", (req, res) => {
  deleteTodo(req, res);
});

router.put("/update", (req, res) => {
  updateTodo(req, res);
});

module.exports = router;
