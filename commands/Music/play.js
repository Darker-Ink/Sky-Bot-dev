const { MessageEmbed } = require("discord.js");
const distube = require("distube");
module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
        try {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
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
      if (!songName) {
        const playError2 = new MessageEmbed()
          .setDescription("You Need to provide a Song name or URL!")
          .setColor("RED")
        return message.channel.send(playError2)
      }
        voiceChannel.join().then(connection => {
          connection.voice.setSelfDeaf(true)
        })
        client.distube.play(message, songName)
      } catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
  },
};
