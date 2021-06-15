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
    name: 'join',
    description: "Joins The Voice Channel",
    usage: "?join",
    aliases: ['summon'],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
		if (channel) {
			try {
				const connection = await connectToChannel(channel);
				await message.reply('Joined The VC');
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Join a voice channel then try again!');
		}
	}
}