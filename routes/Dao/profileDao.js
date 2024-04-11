const Verification = require("../../common/verifyUser");
const {
  registerUserController,
  loginUserController,
  sessionUserController,
} = require("../Controllers/profileController");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

async function registerUserDao(data) {
  const saltRounds = 5;
  const hash = await bcrypt.hash(data.pwd, saltRounds);
  data.pwd = hash;
  const res = await registerUserController(data);
  return res;
}

async function verifyUserDao(mail) {
  const res = await Verification.emailVerify(mail);
  return res;
}

async function loginUserDao(data) {
  const accounts = await loginUserController(data);
  const res = {};
  if (accounts.length === 1) {
    const result = await bcrypt.compare(data.pwd, accounts[0].pwd);
    if (result) {
      res.status = "success";
      res.id = accounts[0]._id;
    } else {
      res.status = "failure";
    }
  } else {
    res.status = "failure";
  }
  return res;
}

async function sessionUserDao(oid) {
  const _id = ObjectId.createFromHexString(oid);
  const res = await sessionUserController(_id);
  return res;
}

module.exports = {
  registerUserDao,
  verifyUserDao,
  loginUserDao,
  sessionUserDao,
};
