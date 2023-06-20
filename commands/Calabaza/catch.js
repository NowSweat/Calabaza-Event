const asociaCalabaza = require("../../functions/asociaCalabaza");
const Calabaza = require("../../Database/Schemas/CalabazActual");

module.exports = {
  name: "catch",
  cooldown: 3000,
  aliases: ["c"],
  async execute(client, message, args) {
    try {
      if (!args[0])
        return message.reply("Debes especificar el ID de una calabaza.");

      const calabazaID = args[0].trim().split(/ +/g).shift().toLowerCase();
      const data = await Calabaza.findOne({ ID: calabazaID });

      if (!data || data.ID !== calabazaID) {
        return message.reply("Te has equivocado!");
      }

      await asociaCalabaza(message, calabazaID);
      await Calabaza.deleteOne({ ID: calabazaID });
    } catch (err) {
      console.error(err);
      return;
    }
  },
};
