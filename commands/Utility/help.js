const Discord = require('discord.js');
const configs = require('../../config/config.json');
module.exports = {
    name: 'help',
    guildOnly: false,
    usage: "help <cmd>",
    description: 'Get Help',
    category: "Utility",
    run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      const embed = new Discord.MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .addField("Info", "Tad Bit of Info [channel] Means the channel you are in <message> means You need a message")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new Discord.MessageEmbed()
        .setDescription(`Snow Bot | Version: ${configs.version}`)
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "No Category";
        let name = comm.name;

        if (!com[category]) {
          com[category] =  [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()} [${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};