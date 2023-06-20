const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "info",
  aliases: ["i"],
  cooldown: 3000,
  async execute(client, message, args) {
    let dataDB = await client.db.getUser(message.author.id);
    console.log(dataDB);
    const jsonContenido = fs.readFileSync("config/embeds.json", "utf-8");

    const data = JSON.parse(jsonContenido);

    const calabazas = data.imagenes;

    const calabazaID = args[0].trim().split(/ +/g).shift().toLowerCase();
    if (!calabazaID)
      return message.reply("Tienes que especificar una calabaza para mostrar.");
    const calabazaEncontrada = calabazas.find(
      (info) => info.calabazaID === calabazaID
    );
    const calabazaDB = dataDB.calabazasCapturadas.find(
      (calabaza) => calabaza.calabazaID === calabazaID
    );
    let footerText;
    try {
      if (calabazaDB.cantidad == 1) {
        footerText =
          "Haz capturado " + calabazaDB.cantidad + " calabaza de este tipo";
      } else {
        footerText =
          "Haz capturado " + calabazaDB.cantidad + " calabazas de este tipo";
      }
    } catch (err) {
      footerText = "0";
    }
    if (!calabazaEncontrada)
      return message.reply("No se encuentra esa calabaza.");
    let embed = new Discord.EmbedBuilder()
      .setTitle(`${calabazaID.charAt(0).toUpperCase() + calabazaID.slice(1)}`)
      .setDescription(calabazaEncontrada.descripcionImagen)
      .addFields(
        { name: "Tipo", value: calabazaEncontrada.tipo },
        { name: "Región", value: calabazaEncontrada.region }
      )
      .setImage(calabazaEncontrada.enlaceImagen)
      .setColor("Orange")
      .setFooter({ text: String(footerText) });
    message.channel.send({ embeds: [embed] });
  },
};
