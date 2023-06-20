const Spawn = require("../functions/calabazaSpawn");
const { PREFIX } = require("../config/config.json");
const asociaCalabaza = require("../functions/asociaCalabaza");
cmdCooldown = {};
module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
    if (!message.guild) return;
    client.db.getUser(message.author.id); // Con esta linea de código creamos el usuario para que no nos dé error a la hora de capturar.
    Spawn(message); // Función de aparecer, es importante ya que con esto nuestro bot funciona.
    let prefix = PREFIX;

    if (
      message.content === `<@!${message.client.user.id}>` ||
      message.content === `<@${message.client.user.id}>`
    ) {
      return message.reply({
        content: `Uh! No te acuerdas mi prefix? Es \`${prefix}\``,
        allowedMentions: { repliedUser: true },
      });
    }

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!cmd) return;

    let userCooldown = cmdCooldown[message.author.id];
    if (!userCooldown) {
      cmdCooldown[message.author.id] = {};
      uCooldown = cmdCooldown[message.author.id];
    }
    let time = uCooldown[cmd.name] || 0;
    if (time && time > Date.now()) {
      return message.react("⏲️");
    }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;

    cmd.execute(client, message, args);
  } catch (err) {
    console.log(err);
  }
};
