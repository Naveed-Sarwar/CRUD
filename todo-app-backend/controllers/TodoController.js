const AddTodo = require("../modals/TodoModal");

module.exports.addTodo = async (req, res) => {
  const  {todo , userId}  = req.body;
  const newTodo = new AddTodo({
    todo,
    userId,
  });

  newTodo.save((err, success) => {
    if (err) {
      res
        .status(400)
        .json({ status: "error", message: err?.message, statusCode: 400 });
      return;
    }
    res.status(201).json({
      status: "success",
      data: success,
      message: "SUCCESSFULLY ADDED",
      statusCode: 201,
    });
    return;
  });
};

module.exports.getTodo = async (req, res) => {
  try {
    const getTodo = await AddTodo.find({});
    res.status(200).json({ status: "success", data: getTodo, statusCode: 200 });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: { error }, statusCode: 400 });
  }
};

module.exports.deleteTodo = async (req, res) => {
  const  {id}  = req.params;
  console.log("id", req.body);
  try {
    const del = await AddTodo.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "delete success", data: del, statusCode: 200 });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error delete", message: { error }, statusCode: 400 });
  }
};

module.exports.updateTodo = async (req, res) => {
  const { todo } = req.body;
  const update = await AddTodo.findByIdAndUpdate(
    req.body._id,
    { todo },
    { new: true }
  );

  update.save((err, success) => {
    if (err) {
      res
        .status(400)
        .json({ status: "error", message: err?.message, statusCode: 400 });
      return;
    }
    res.status(201).json({
      status: "success",
      data: success,
      message: "SUCCESSFULLY Updated",
      statusCode: 201,
    });
    return;
  });
};
