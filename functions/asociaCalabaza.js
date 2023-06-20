const Discord = require('discord.js');
const userSchema = require('../Database/Schemas/userSchema');
const fs = require('fs');
const mongoose = require('mongoose');

/**
 *
 * @param {Discord.Message} message
 * @param {string} calabazaID
 */
async function asociaCalabaza(message, calabazaID) {
  const usuarioID = message.author.id;

  const usuario = await userSchema.findOne({ userID: usuarioID });

  const calabazaCapturada = usuario.calabazasCapturadas.find(
    (calabaza) => calabaza.calabazaID === calabazaID
  );

  if (calabazaCapturada) {
    calabazaCapturada.cantidad++;
  } else {
    usuario.calabazasCapturadas.push({ calabazaID: calabazaID, cantidad: 1 });
  }

  await usuario.save();
  message.channel.send(`Felicidades <@${message.author.id}>! Capturaste a ${calabazaID.charAt(0).toUpperCase() + calabazaID.slice(1)}`);
}

module.exports = asociaCalabaza;
