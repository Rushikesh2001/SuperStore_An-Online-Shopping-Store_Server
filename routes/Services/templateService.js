const express = require("express");
const router = express.Router();

router.get("/otp", function (req, res, next) {
  const { id } = req.query;
  res.render("otpMailTemplate", { otp: id });
});

module.exports = router;
