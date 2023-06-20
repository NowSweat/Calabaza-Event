const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: Number,
  calabazasCatch: Number,
  money: Number,
  calabazasCapturadas: [
    {
      cantidad: Number,
      calabazaID: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
