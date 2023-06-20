const Calabaza = require("../../Database/Schemas/CalabazActual");
module.exports = {
  name: "hint",
  aliases: ["h"],
  category: "Calabaza",
  cooldown: 15000,
  async execute(client, message, args) {
    const data = await Calabaza.findOne({});
    const pista = generarPista(data.ID);

    message.channel.send("La calabaza es " + pista);
  },
};

function generarPista(nombre) {
  const letras = nombre.split("");
  const letrasReveladas = [];

  while (letrasReveladas.length < Math.floor(letras.length / 2)) {
    const indiceAleatorio = Math.floor(Math.random() * letras.length);
    if (!letrasReveladas.includes(indiceAleatorio)) {
      letrasReveladas.push(indiceAleatorio);
    }
  }

  const nombreOculto = letras
    .map((letra, indice) => (letrasReveladas.includes(indice) ? letra : "_"))
    .join("");

  return nombreOculto;
} 
