const bcrypt = require("bcrypt");
const AuthModal = require("../modals/AuthModal");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new AuthModal({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    await user.save();
    console.log("p", process.env.jwtKey);
    var token = await jwt.sign({ email: email }, process.env.jwtKey);
    console.log("fir", user);

    user.token = token;
    res.status(200).json({
      status: "success",
      message: "User Sucessfully Registered",
      data: user,
      statusCode: 200,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
      statusCode: 400,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModal.findOne({ email: email });

    if (!user) {
      res.status.json({
        status: "error",
        statusCode: 400,
        message: "please enter valid email",
      });
      return;
    } else if (!(await bcrypt.compare(password, user.password))) {
      res.status.json({
        status: "error",
        statusCode: 400,
        message: "please enter valid password",
      });
      return;
    }
    var token = await jwt.sign({ email: email }, process.env.jwtKey);

    var data = {
      _id: user?._id,
      email: user?.email,
      token,
    };
    res.status(202).json({
      status: "success",
      message: " Login successfully",
      data: data,
      statusCode: 202,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Please Enter Valid Information",
      data: error,
      statusCode: 400,
    });
  }
};


module.exports.getLoggedInUser = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await jwt.verify(token, process.env.jwtKey);
    if (decoded.email) {
      const user = await AuthModal.findOne({ email: decoded?.email });
      if (!user) {
        res.status.json({
          status: "error",
          message: "User not found",
          statusCode: 404,
        });
        return;
      }
      let data = {
        id: user?._id,
        email: user?.email,
      };
      res.status(202).json({
        status: "success",
        message: "User get successfully",
        data: data,
        statusCode: 202,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error?.message,
      statusCode: 404,
    });
  }
};
