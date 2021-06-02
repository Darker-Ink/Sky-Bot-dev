const Discord = require('discord.js');
    module.exports = {
        name: 'changelog', 
        usage: "-changelog",
        description: 'Gives the current changelog', 
        category: "Utility",
        aliases: "chl",
        cooldown: 300,
        ownerOnly: false,
        disabledbug: false, 
        disabled: false, // If the command is still being Made
        run: async (client, message, args, data) => {
message.channel.send(new Discord.MessageAttachment('./changelog.txt', 'changelog.txt') )
//don't forget to add a .js if you are trying to get a file from the server
      }
    };