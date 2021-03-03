const Discord = require('discord.js');
const { inspect } = require('util');
const fs = require('fs')
const config = require('../../config/config.json');

module.exports = {
    name: 'reload',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reload the commands',
    usage: "reload <command>",
    category: "Owner",
    run: async (client, message, args) => {
      try {
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  // OMG
  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }

  // IT WORKS
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // YESSSSS
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);
    }
    catch (error) {
      message.reply(`There was an error when reloading the commands, \n\n**${error}**`);
}
    }
}
//I AM HAPPY 