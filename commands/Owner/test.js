const Discord = require('discord.js');
const { inspect } = require('util');
const fs = require('fs')
const config = require('../../config/config.json');

module.exports = {
    name: 'test',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reload the commandFiles',
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
    client.commands = undefined
   console.log(client.commands)

    client.commands = new Discord.Collection();

        function getDirectories() {
  return fs.readdirSync("./commands").filter(function subFolders(file) {
    return fs.statSync("./commands/" + file).isDirectory();
  });
}
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
  const folderFiles = fs
    .readdirSync("./commands/" + folder)
    .filter((file) => file.endsWith(".js"));
  for (const file of folderFiles) {
    commandFiles.push([folder, file]);
  }
}
for (const file of commandFiles) {
  let command;
  if (Array.isArray(file)) {
    command = require(`../../commands/${file[0]}/${commandName}.js`);
  } else {
    command = require(`./commands/${file}`);
  }

  client.commands.set(command.name, command);
  
}
message.channel.send('LETS GOOOO')
      }catch (err) {
      console.log('fuck a error');
      message.reply(`There was an error during evaluation, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
    }
}