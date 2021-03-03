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

    if (message.author.id == ownerid || message.author.id === '677216269271040041') {
  let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
  }
    
catch (error) {
      console.log(error);
      message.reply(`There was an error during evaluation, \n\n**${error}**`);
    }
  }
}};