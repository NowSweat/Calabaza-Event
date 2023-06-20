const Discord = require("discord.js");
const config = require("./config/config.json");
const util = require("util");
const fs = require("fs"),
  readdir = util.promisify(fs.readdir);
const client = new Discord.Client({
  intents: ["36619"],
});

client.event = new Discord.Collection();
client.commands = new Discord.Collection();
client.db = require("./Database/index");

async function init() {
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split(".")[0];
  console.log(`CARGANDO EL EVENTO ${eventName}`);
  client.on(eventName, event.bind(null, client));
}

  let folders = await readdir("./commands/");
  folders.forEach((direct) => {
    const commandFiles = fs
      .readdirSync("./commands/" + direct + "/")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${direct}/${file}`);
      client.commands.set(command.name, command);
    }
  });
}
init();
client.login(config.TOKEN);


/**
 * Este Command Handler y Event Handler fue hecho apartir de:
 * https://github.com/KSJaay/Alita
 */