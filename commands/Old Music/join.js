module.exports = {
    name: 'join',
    description: "Joins The Voice Channel",
    usage: "?join",
    aliases: ['summon'],
    category: "Music",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("You must be in a VC to use this command!")

        try {
            if (voiceChannel.type == 'stage') {
                await voiceChannel.join().then(connection => {
                                connection.voice.setSelfDeaf(true)
                                connection.voice.setSuppressed(false);
                            })
                } else {
                await voiceChannel.join().then(connection => {
                                connection.voice.setSelfDeaf(true)
                                //connection.voice.setSuppressed(false);
                            })
                }
        } catch (error) {
            console.log(`There Was An Error Connecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
}