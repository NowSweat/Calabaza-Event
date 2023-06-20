module.exports = {
    name: 'ping',
    category: 'General',
    aliases: ['p'],
    cooldown: 5000,

    async execute(client,message,args) {
        return message.reply('Pong')
    }
}