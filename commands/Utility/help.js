const Discord = require('discord.js');
const configs = require('../../config/config.json');
const db = require('quick.db')
module.exports = {
    name: 'help',
    guildOnly: false,
    usage: "help <cmd>",
    description: 'Get Help',
    category: "Utility",
    run: async (client, message, args) => {
      let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;
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
        .addField("Info", "Tad Bit of Info [channel] Means the channel you are in <message> means You need a message")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new Discord.MessageEmbed()
        .setDescription(`Snow Bot | Version: ${configs.version} | Command Amount: ${client.commands.size}`)
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
let database = db.get(`guildConfigurations_${message.guild.id}.commands`)

        if(database) {
                let array = []
                database.forEach(m => {
                    array.push('`' + m.name + '`')
                })
                if(array.length > 0) {
                    emx.addField(`Custom Commands`, array.join(', '))
                }      
            }
      return message.channel.send(emx);
    }
  }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Darkerink Already Got the error and Got pinged, He will check it out soon but anyways here is the error, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}};