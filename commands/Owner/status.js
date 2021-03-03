const Discord = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'status',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reload the commands',
    usage: "reload <command>",
    run: async (client, message, args) => {
      if (!config.owner.includes(message.author.id)) {
            return message.channel.send(`lmao are you the Owner? No So why are you trying to use this command...? <:thonking:814600683458265090>`)
        }
const status = args[0];
    if (!status) return message.reply("A status type must be provided.");

    const statusType = args[0].toLowerCase();

    if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
      client.user.setStatus(status);
      message.channel.send(`☑️ | Status successfully changed to **${statusType}**.\nPlease note that initially changing status may take up to a minute or two.`);
    } else {
      return message.channel.send(`"${statusType}" is not a valid status type.`);
    }
  }
}