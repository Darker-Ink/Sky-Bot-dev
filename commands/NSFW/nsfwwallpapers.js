const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "nsfwwallpapers",
  aliases: ["nmw", "nsfwmobilewallpapers", "nsfwmwall"],
  category: "nsfw",
  description: "Get some wallpapers",
  nsfwOnly: true,
  run: async (client, message, args) => {
    try {
    if(!message.channel.nsfw) return message.reply("This channel dosen't support nsfw content")
akaneko.nsfw.wallpapers().then((imageURL) => {
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(imageURL);
    return message.channel.send(akanekoSan);
})
      
 } catch (error) {
            message.channel.send(`${error.stack}`)
        }
  }
}