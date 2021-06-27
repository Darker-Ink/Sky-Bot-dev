const {
	AudioPlayerStatus,
	AudioResource,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus,
} = require('@discordjs/voice');
module.exports = {
    name: 'join',
    description: "Joins The Voice Channel",
    usage: "?join",
    aliases: ['summon'],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
        async function connectToChannel(channel) {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                selfDeaf: true, // <- here
                selfMute: false,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            try {
                await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
                return connection;
            } catch (error) {
                connection.destroy();
                throw error;
            }
        }
        if(channel.type === 'stage') {
            const connection = await connectToChannel(channel);
            return message.guild.me.voice.setSuppressed(false);
        } else if(channel.type === 'voice') {
            const connection = await connectToChannel(channel);
            
        }
    }}