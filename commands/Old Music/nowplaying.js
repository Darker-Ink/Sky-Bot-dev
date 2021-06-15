const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const discord = require("discord.js");
const distube = require("distube");
const { format, createBar } = require("../../tools/functions")
module.exports = {
    name: "nowplaying",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["np"],
    category: "Music",
    run: async (client, message, args) => {
        try {

            if (!message.member.voice.channel) {
                const playError = new MessageEmbed()
                    .setDescription("You need to be in a voice channel to see what is playing")
                    .setColor("RED")
                return message.channel.send(playError)
            }
            const status = (queue) =>
                `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
            let queue = client.distube.getQueue(message);

            if (!queue) {
                const queueError = new MessageEmbed()
                    .setDescription("There is Nothing Playing, Trying adding something!")
                    .setColor("RED")
                return message.channel.send(queueError)
            }
            let cursong = queue.songs[0];
            const np = new Discord.MessageEmbed()
	            .setColor('RANDOM')
                .setTitle('NowPlaying')
                .setAuthor('Current Song')
                .setDescription(`[${cursong.name}](${cursong.url})\n\nPlaying for: \`${queue.formattedCurrentTime}\`\n\nDuration: \`${cursong.formattedDuration}\``)
                 .addField("Views", `▶` + parseFloat(cursong.views).toLocaleString('en'),true)
        		.addField("Dislikes", `:thumbsdown:` + parseFloat(cursong.dislikes).toLocaleString('en'),true)
        		.addField("Likes", `:thumbsup:` + parseFloat(cursong.likes).toLocaleString('en'),true)
        		//.addField("Duration: ", createBar(queue.formattedCurrentTime))
                .addField('**Status**', status(queue))
                .setTimestamp()
                .setThumbnail(cursong.thumbnail)
			console.log(queue.currentTime)
            message.channel.send(np);
        } catch (error) {
            message.reply(errorMessage)
            errorhook.send('```\n' + error.stack + '\n```')
        }
    }
}