const { MessageEmbed } = require("discord.js");
const config = require('../../config/config.json');

module.exports = {
    name: "status",
    description: "Shows the current bot servers and users.",
    usage: "[]",
    aliases: ["servers", "BotOwnerInfo"],
    category: "Owner",
  run: async function (client, message, args) {
    if (!config.owners.includes(message.author.id)) {
            return message.channel.send(`lmao are you the Owner? No So why are you trying to use this command...? <:thonking:814600683458265090>`)
        }
    let embed = new MessageEmbed()
    .setAuthor("Bot Status")
    .setColor("RANDOM")
    .setThumbnail("https://66.media.tumblr.com/0ba8e2989811721a348c576a1d24ce77/tumblr_pm73bqPfrx1wvmt49_540.gif")
    .addField("General", [

        `**❯  Servers:** Serving ${client.guilds.cache.size} servers.`,

        `**❯  Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}` 

        ])
    .setTimestamp();

        return message.channel.send(embed)
   }
}