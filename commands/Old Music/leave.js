const {
	NoSubscriberBehavior,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice');
module.exports = {
    name: 'leave',
    description: "Joins The Voice Channel",
    usage: "?leave",
    aliases: ['dc'],
    category: "Music",
    run: async (client, message, args) => {
        async function connectToChannel(channel) {
            const connection = leaveVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            })};
        const channel = message.member?.voice.channel;
		if (channel) {
			try {
				const connection = await connectToChannel(channel);
				await message.reply('Left the VC');
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Join a voice channel then try again!');
		}
	}
}
// module.exports = {
//    name: 'leave',
//    description: "Leaves The Voice Channel",
//    aliases: ['dc', 'disconnect'],
//    category: "Music",
//    run: async (client, message, args) => {
//        const voiceChannel = message.member.voice.channel
//
//        if (!voiceChannel) return message.channel.send("I\'m Not In A Voice Channel")
//
//        try {
//            voiceChannel.leave()
//        } catch (err) {
//            message.reply(errorMessage)
//            errorhook.send('```\n' + err.stack + '\n```')
//        }
//    }
// }
