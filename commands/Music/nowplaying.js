const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const discord = require("discord.js");
const distube = require("distube");
module.exports = {
    name: "nowplaying",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["np"],
    category: "Music",
    run: async (client, message, args, song) => {
        try {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
        
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
        let cursong = queue.songs[0];
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("There is Nothing Playing, Trying adding something!")
            .setColor("RED")
            return message.channel.send(queueError)
        } 
const exampleEmbed = new Discord.MessageEmbed()

    .setColor('RANDOM')
    .setTitle('NowPlaying')
    .setAuthor('Current Song')
    .setDescription(`[${cursong.name}](${cursong.url})\n\nPlaying for: \`${(Math.floor(queue.currentTime / 1000 / 60 * 100) / 100).toString().replace(".", ":")} Minutes\`\n\nDuration: \`${cursong.formattedDuration}\``)
    .addField('**Status**', status(queue))
    .setTimestamp()
	.setThumbnail(cursong.thumbnail)

message.channel.send(exampleEmbed);
    } catch (error) {
      message.reply(`You Complete Dumbfuck, \n\n**${error.stack}**`);
    }}}