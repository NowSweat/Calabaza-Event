const mongoose = require("mongoose");
const { DB_URL } = require("../config/config.json");
const Calabazas = require("../Database/Schemas/CalabazActual");

module.exports = async (client) => {
  console.log(
    `${client.user?.username}#${client.user?.discriminator} fue logeado correctamente!`
  );
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("BASE DE DATOS CONECTADA");
    })
    .catch((err) => {
      console.log("ALGO OCURRIO EN LA BASE DE DATOS, \nError:" + err);
    });
  await Calabazas.deleteMany({}); // Esta linea de código elimina todos los datos de la colección donde se guardan las calabazas a la hora de aparecer. ! IMPORTANTE
  console.log("Se han eliminado todos los documentos de la colección.");
};
