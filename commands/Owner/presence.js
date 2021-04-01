const Discord = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'presence',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reload the commands',
    usage: "reload <command>",
    category: "Owner",

    run: async (client, message, args) => {
      try {
const status = args[0];
    if (!status) return message.reply("A status type must be provided.");

    const statusType = args[0].toLowerCase();

    if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
      client.user.setStatus(status);
      message.channel.send(`☑️ | Status successfully changed to **${statusType}**.\nPlease note that initially changing status may take up to a minute or two.`);
    } else {
      return message.channel.send(`"${statusType}" is not a valid status type.`);
    }
  }catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}