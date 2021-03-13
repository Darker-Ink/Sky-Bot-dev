module.exports = {
    name: 'leave',
    description: "Leaves The Voice Channel",
    aliases: ['dc', 'disconnect'],
    category: "Music",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("I\'m Not In A Voice Channel")

        try {
            voiceChannel.leave()
        } catch(error) {
            console.log(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
        }
    }
}