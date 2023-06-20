const mongoose = require("mongoose");
const { DB_URL } = require("../config/config.json");
const userSchema = require("./Schemas/userSchema");

async function getUser(key) {
  let userDB = await userSchema.findOne({ userID: key });
  if (!userDB) {
    userDB = new userSchema({
      userID: key,
      calabazasCatch: 0,
      money: 500,
      calabazasCapturadas: [],
    });
    await userDB.save().catch((err) => console.log(err));
  }
  return userDB;
}

module.exports.getUser = getUser;
