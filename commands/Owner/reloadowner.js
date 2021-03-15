const Discord = require('discord.js');
const { inspect } = require('util');
const fs = require('fs')
const config = require('../../config/config.json');

module.exports = {
    name: 'reloadowner',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reloads the commands',
    usage: "reload <command>",
    category: "Owner",
    run: async (client, message, args) => {
      try {
        if (!config.owners.includes(message.author.id)) {
            return message.channel.send(`lmao are you the Owner? No So why are you trying to use this command...? <:thonking:814600683458265090>`)
        }
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist In **OWNER**");
  }

  // IT WORKS
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // YESSSSS
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);
    }
    catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }}
}
//I AM HAPPY 