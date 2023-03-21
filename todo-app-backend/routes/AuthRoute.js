const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getLoggedInUser,
} = require("../controllers/AuthController");

router.post("/signup", (req, res) => {
  signup(req, res);
});

router.post("/getLoggedInUser", (req, res) => {
  getLoggedInUser(req, res);
}),
  router.post("/login", (req, res) => {
    login(req, res);
  });

module.exports = router;
