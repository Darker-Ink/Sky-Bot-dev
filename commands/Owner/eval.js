const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const config = require('../../config/config.json');
const fs = require('fs')
const colors = require('colors');
const stringOne = '[WARN] Someone Used the eval command'.yellow;

module.exports = {
    name: "eval",
    description: "To List the servers",
    usage: "",
    aliases: ["eval"],
    category: "Owner",
  run: async (client, message) => {
      console.log(stringOne)
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

    if (!config.owners.includes(message.author.id)) {
            return message.channel.send(`lmao are you the Owner? No So why are you trying to use this command...? <:thonking:814600683458265090>`)
        }
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
  }
    
catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}};