const express = require("express");
const router = express.Router();
const {
  registerUserDao,
  verifyUserDao,
  loginUserDao,
  sessionUserDao,
} = require("../Dao/profileDao");

router.post("/register", async function (req, res, next) {
  const data = req.body;
  try {
    const response = await registerUserDao(data);
    res.send(JSON.stringify(response));
  } catch (err) {
    res.send(
      JSON.stringify({
        status: "failure",
        error: err,
        message: "User registration failed due to some error",
      })
    );
  }
});

router.post("/verify", async function (req, res, next) {
  const { mail } = req.body;
  console.log(mail);
  try {
    const response = await verifyUserDao(mail);
    res.send(JSON.stringify(response));
  } catch (error) {
    res.send(
      JSON.stringify({
        status: "failure",
        data: null,
        error,
        message: "Invalid email id given during registration",
      })
    );
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const response = await loginUserDao(req.body);
    res.send(JSON.stringify(response));
  } catch (error) {
    res.send(
      JSON.stringify({
        status: "failure",
        message: "Invalid credentials",
        error,
      })
    );
  }
});

router.post("/session", async function (req, res, next) {
  try {
    const { oid } = req.body;
    const response = await sessionUserDao(oid);
    res.send(JSON.stringify(response[0]));
  } catch (error) {
    res.send(
      JSON.stringify({
        status: "failure",
        error,
        message:
          "Failed to fetch user details. Check for document id in database",
      })
    );
  }
});

module.exports = router;
