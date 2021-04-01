const Discord = require('discord.js');
const configs = require('../../config/config.json');
const db = require('quick.db')
const ms = require("parse-ms");
module.exports = {
    name: 'help',
    guildOnly: false,
    usage: "help <cmd>",
    description: 'Get Help',
    category: "Utility",
    cooldown: 8,
    run: async (client, message, args) => {
      let user1 = db.get(`blacklist_${message.author.id}`);
  if(user1 == true) return;
      try {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }
      const embed = new Discord.MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
		.addField("aliases", "`" + command.aliases + "`" || "Not Provied")
      //	.addField("aliases", "`" + command.aliases + "`" || "Not Provied")
        .addField("Info", "Tad Bit of Info [channel] Means the channel you are in <message> means You need a message")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;
      let emx = new Discord.MessageEmbed()
        .setDescription(`${client.user.username} | Version: ${configs.version} | Command Amount: ${client.commands.size}`)
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
	  console.log(emx)
      return message.channel.send(emx);
        
    }
  }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Darkerink Already Got the error and Got pinged, He will check it out soon but anyways here is the error, ||idk why you would need it though|| \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}};