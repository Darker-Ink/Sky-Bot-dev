const Discord = require("discord.js");
const ownerid = "791741154999140374";
const { inspect } = require('util');

module.exports = {
    name: "eval",
    description: "To List the servers",
    usage: "",
    aliases: ["eval"],
  run: async (client, message) => {
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
    
catch (error) {
      console.log(error);
      message.reply(`There was an error during evaluation, \n\n**${error}**`);
    }
}};