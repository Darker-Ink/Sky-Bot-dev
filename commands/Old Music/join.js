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
        async function connectToChannel(channel) {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            })};
        const channel = message.member?.voice.channel;
		if (channel) {
			try {
                if (channel.type == 'stage') {
                    const connection = await connectToChannel(channel) 
                    connection.message.guild.me.voice.setDeaf(true);
                    connection.message.messageguild.me.voice.setSuppressed(false);
                                    await message.reply('Joined The VC');
                    } else {
                        const connection = await connectToChannel(channel)
                        connection.guild.me.voice.setDeaf(true);
                                    await message.reply('Joined The VC');
                    }
			} catch (error) {
				console.error(error);
			}
		} else {
			await message.reply('Join a voice channel then try again!');
		}
	}
}