const Discord = require('discord.js');
const configs = require('../../config/config.json');
const db = require('quick.db')
const ms = require("parse-ms");
module.exports = {
    name: 'old-help',
    guildOnly: false,
    usage: "help <cmd>",
    description: 'Get Help',
    category: "Utility",
    aliases: "",
    cooldown: 8,
    run: async (client, message, args) => {
        try {
      if (args[0]) {
        const command = client.commands.get(args[0]);
        if (!command) {
          return message.channel.send("Unknown Command: " + args[0]);
        }
        const embed = new Discord.MessageEmbed()
                    .setAuthor(command.name, client.user.displayAvatarURL())
                    .addField("Description", command.description || "No Description", false)
                    .addField("Usage", "`" + command.usage + "`" || "Not Provied", false)
                    .addField("aliases", command.aliases || "No Aliases", false)
                    //.addField("Cooldown",  command.cooldown || "2", true)
                    .addField("Perms Needed", command.perms || "No Perms Needed", false)
                    .addField("Info", `${dresponses}`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setFooter(client.user.username, client.user.displayAvatarURL());
                return message.channel.send(embed);
      } else {
        const commands = client.commands;
        let helpem= new Discord.MessageEmbed()
                    .setDescription(`${client.user.username} | Version: ${configs.version} | Command Amount: ${client.commands.size}`)
                    .setColor("RANDOM")
                    .setFooter(client.user.username, client.user.displayAvatarURL())

        let com = {};

        for (let comm of commands.array()) {
          if (!comm.hidden) {
            let category = comm.category || "No Category";
            let name = comm.name;

            if (!com[category]) {
              com[category] = [];
            }
            com[category].push(name);
          }
        }

        for (const [key, value] of Object.entries(com)) {
          let category = key;

          let desc = "`" + value.join("`, `") + "`";

          helpem.addField(`${category.toUpperCase()} [${value.length}]`, desc);
        }
        return message.channel.send(helpem);
      }
    } catch (err) {
      console.log(err);
      message.reply(`There was a error when running the command`);
    }
  },
};