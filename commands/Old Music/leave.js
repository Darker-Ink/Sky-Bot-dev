module.exports = {
    name: 'leave',
    description: "Leaves The Voice Channel",
    aliases: ['dc', 'disconnect'],
    category: "Music",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("I\'m Not In A Voice Channel")

        try {
            voiceChannel.leave()
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    }
}