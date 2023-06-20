const Discord = require("discord.js");
const fs = require("fs");
const Actual = require("../Database/Schemas/CalabazActual");

const {
  MENSAJES_MINIMOS,
  MENSAJES_MAXIMOS,
  PREFIX,
} = require("../config/config.json");

let mensajesAntesDeEnviar =
  Math.floor(Math.random() * (1 - 5)) + MENSAJES_MAXIMOS;
let contadorMensajes = 0;
/**
 *
 * @param {Discord.Message} message
 */
async function Spawn(message) {
  console.log("Mensajes: " + mensajesAntesDeEnviar);

  contadorMensajes++;

  if (contadorMensajes === mensajesAntesDeEnviar) {
    await Actual.deleteMany({});
    const calabazaAleatoria = generarCalabazaAleatoria();
    let embed = new Discord.EmbedBuilder()
      .setTitle("¡Una nueva calabaza ha aparecido!")
      .setDescription(
        `Adivina la calabaza y escribe \`${PREFIX}catch <calabaza>\` para capturarla!`
      )
      .setColor("Orange")
      .setImage(calabazaAleatoria[1]);
    message.channel.send({ embeds: [embed] });

    const calabaza = new Actual({
      ID: calabazaAleatoria[0],
    });
    await calabaza
      .save()
      .then((data) => {
        console.log("Guardado: " + data);
      })
      .catch((err) => console.log(err));

    contadorMensajes = 0;
    mensajesAntesDeEnviar =
      Math.floor(Math.random() * (MENSAJES_MINIMOS - MENSAJES_MAXIMOS)) +
      MENSAJES_MAXIMOS;
  }
}

function generarCalabazaAleatoria() {
  const jsonContenido = fs.readFileSync("config/embeds.json", "utf-8");
  const data = JSON.parse(jsonContenido);
  const imagenes = data.imagenes;

  const sumaProbabilidades = imagenes.reduce(
    (suma, imagen) => suma + imagen.probabilidad,
    0
  );

  const numeroAleatorio = Math.random() * sumaProbabilidades;

  let sumaParcial = 0;
  for (const imagen of imagenes) {
    sumaParcial += imagen.probabilidad;
    if (numeroAleatorio < sumaParcial) {
      return [imagen.calabazaID, imagen.enlaceImagen];
    }
  }
}

module.exports = Spawn;
