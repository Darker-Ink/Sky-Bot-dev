module.exports = {
    name: 'join',
    description: "Joins The Voice Channel",
    usage: "?join",
    aliases: ['summon'],
    category: "Music",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("You must be in a VC to use this command!")

        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            console.log(`There Was An Error Connecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
}