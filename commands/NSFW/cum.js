const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "cum",
  aliases: [],
  category: "nsfw",
  description: "Get some wallpapers",
  nsfwOnly: true,
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("This channel dosen't support nsfw content")
      
    } else {
    	akaneko.nsfw.cum().then((imageURL) => {
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(imageURL);
    return message.channel.send(akanekoSan);
        })
    }
  }
}