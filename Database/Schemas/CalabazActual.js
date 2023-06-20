const { Schema, model } = require("mongoose");

const CalabazaActual = new Schema({
  ID: String,
});
const Calabaza = new model("CalbazaActual", CalabazaActual);

module.exports = Calabaza;
