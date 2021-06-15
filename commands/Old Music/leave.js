module.exports = {
    name: 'leave',
    description: "Leaves The Voice Channel",
    aliases: ['dc', 'disconnect'],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
		if (channel) {
			try {
				const { getVoiceConnection } = require('@discordjs/voice')
            var connection = getVoiceConnection(message.guild.id)
            connection.destroy()
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Join a voice channel then try again!');
		}
    }}