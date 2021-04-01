const { MessageEmbed } = require("discord.js");
const config = require('../../config/config.json');

module.exports = {
    name: "servers",
    description: "Shows the current bot servers and users.",
    ownerOnly: true,
    usage: '',
    aliases: ["servers", "BotOwnerInfo"],
    category: "Owner",
  run: async function (client, message, args) {
    try {
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
   }catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}