const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const TodoRoute = require("./routes/TodoRoute");
const AuthRoute =  require("./routes/AuthRoute");

require('dotenv').config()

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://user:Lefti1014@crud.mq5y8.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://test:lefti1014@nodeapi.e9nonzi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connection is Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/", TodoRoute);
app.use("/" , AuthRoute);


app.listen(5000, () => {
  console.log("server is work");
});
