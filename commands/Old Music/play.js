const {
    MessageEmbed
} = require("discord.js");
const distube = require("distube");
var {
  getData,
  getPreview
} = require("spotify-url-info");

module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
        try {
            if (!message.member.voice.channel) {
                const playError = new MessageEmbed()
                    .setDescription("You Need to be in a Voice Channel to play Music!")
                    .setColor("RED")
                return message.channel.send(playError)
            }
            const voiceChannel = message.member.voice.channel
            const permissions = voiceChannel.permissionsFor(message.client.user)
            if (!permissions.has("SPEAK")) {
                const playError2 = new MessageEmbed()
                    .setDescription("I Don\'t Have Permissions to Speak in the Voice Channel")
                    .setColor("RED")
                return message.channel.send(playError2)
            }
            if (!permissions.has("CONNECT")) {
                const playError3 = new MessageEmbed()
                    .setDescription("I Don\'t Have Permissions to Connect to the Voice Channel")
                    .setColor("RED")
                return message.channel.send(playError3)
            }
            let songName = args.slice(0).join(" ")
            if(message.content.includes('falixnodes sucks')){
                voiceChannel.join().then(connection => {
                    connection.voice.setSelfDeaf(true)
                    connection.voice.setSuppressed(false);
                })
                return client.distube.play(message, "https://youtu.be/k3NX7u8tTjI")
            }
            
            if (!songName) {
                const playError2 = new MessageEmbed()
                    .setDescription("You Need to provide a Song name or URL!")
                    .setColor("RED")
                return message.channel.send(playError2)
            }
            if (voiceChannel.type == 'stage') {
                voiceChannel.join().then(connection => {
                                connection.voice.setSelfDeaf(true)
                                connection.voice.setSuppressed(false);
                            })
                } else {
                voiceChannel.join().then(connection => {
                                connection.voice.setSelfDeaf(true)
                                //connection.voice.setSuppressed(false);
                            })
                }
            client.distube.play(message, songName)
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    },
};