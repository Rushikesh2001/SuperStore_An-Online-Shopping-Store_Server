const getDbConnection = require("../../common/getDbCon");

async function registerUserController(data) {
  const db = await getDbConnection();
  const collection = db.collection("accounts");
  const cursor = await collection.insertOne(data);
  return cursor;
}

async function loginUserController(data) {
  const db = await getDbConnection();
  const collection = db.collection("accounts");
  const cursor = await collection.find({ uid: data.uid }).toArray();
  console.log(cursor);
  return cursor;
}

async function sessionUserController(oid) {
  const db = await getDbConnection();
  const collection = db.collection("accounts");
  const cursor = await collection.find({ _id: oid }).toArray();
  console.log(cursor);
  return cursor;
}

module.exports = {
  registerUserController,
  loginUserController,
  sessionUserController,
};
