const mongoclient = require("mongodb").MongoClient;

async function getDbConnection() {
  const client = new mongoclient(
    "mongodb+srv://cityFans:myFirstFSApp@mycluster.wsplvbx.mongodb.net/?retryWrites=true&w=majority"
  );
  await client.connect();
  const db = client.db("superStore");
  return db;
}

module.exports = getDbConnection;
