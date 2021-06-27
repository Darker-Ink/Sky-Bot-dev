const {
    MessageEmbed
} = require("discord.js");
const distube = require("distube");
var {
  getData,
  getPreview
} = require("spotify-url-info");
const {
	AudioPlayerStatus,
	AudioResource,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus,
} = require('@discordjs/voice');
module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
        try {
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
        if(!channel) return message.reply('Please join a channel first, Voice or Stage')
        if(channel.type === 'stage') {
            const connection = await connectToChannel(channel);
            return message.guild.me.voice.setSuppressed(false);
        } else if(channel.type === 'voice') {
            const connection = await connectToChannel(channel);   
        }
            if (channel) {
            let songName = args.slice(0).join(" ")
            if(message.content.includes('falixnodes sucks')){
                return client.distube.play(message, "https://youtu.be/k3NX7u8tTjI")
            }
            
            if (!songName) {
                const playError2 = new MessageEmbed()
                    .setDescription("You Need to provide a Song name or URL!")
                    .setColor("RED")
                return message.channel.send({ embeds: [playError2] })
            }
            client.distube.play(message, songName)
            } else {
                message.reply('Imagine Join a VC')
            }
        } catch (err) {
            console.log(err.stack)
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    },
};