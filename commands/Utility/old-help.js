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
            const responses = [
    '<channel> Means The channel you are in <message> means you need a message <mention> means you need to meantion someone while \[message\] Means you could have a message \[mention\] means you Could mention someone',
    'The support server is the best way to learn about upcoming commands',
    'Report Bugs in the support server!',
    'Need Help? Join the support server',
	'Beep. Boop. I\'m a robot'
  ];
            const dresponses = responses[Math.floor(Math.random() * responses.length)];
            if (args[0]) {
                const command = await client.commands.get(args[0]);
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
                        com[category] = [];
                    }
                    com[category].push(name);

                }

                for (const [key, value] of Object.entries(com)) {
                    let category = key;

                    let desc = "`" + value.join("`, `") + "`";

                    emx.addField(`${category.toUpperCase()} [${value.length}]`, desc);

                }
                return message.channel.send(emx);

            }
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Darkerink Already Got the error and Got pinged, He will check it out soon but anyways here is the error, ||idk why you would need it though|| \n\n**${err}**`);
            client.channels.cache.get("827716948087013406").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}