const {
    MessageEmbed
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const mongoose = require('mongoose');
const Guild = require('../../schema.js')

module.exports = {
    name: "help",
    aliases: [''],
    description: "Shows all available bot commands.",
    disabled: false,
    run: async (client, message, args) => {

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({
                    timeout: 10000
                }));
            }
        });

        const roleColor =
            message.guild.me.displayHexColor === "#000000" ?
            "#ffffff" :
            message.guild.me.displayHexColor;

        if (!args[0]) {
            let categories = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir === 'Owner') return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.filter((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    //return  !file.nsfwOnly && message.channel.nsfw
                    if(!message.channel.nsfw) {
                    return !file.nsfwOnly;
                }
                    return !file.hidden;
                }).map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "To See NSFW commands Use Help In a NSFW channel." : cmds.join(" "),
                };

                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle(`${client.user.username} | Version: ${client.config.version} | Command Amount: ${client.commands.size}`)
                .addFields(categories)
                .setDescription(
                    `Latest Update News: New Command msglog, It lets you Log messages. Snipe command has also been disabled`
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(roleColor);
            return message.channel.send(embed);
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${settings.prefix}help\` for all of my commands!`)
                    .setColor("FF0000");
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "COMMAND:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "ALIASES:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "USAGE:",
                    command.usage ?
                    `\`${settings.prefix}${command.name} ${command.usage}\`` :
                    `\`${settings.prefix}${command.name}\``
                )
                .addField(
                    "DESCRIPTION:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .addField(
                    "PERMS NEEDED:",
                    command.perms ?
                    command.perms :
                    "No Perms needed."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(roleColor);
            return message.channel.send(embed);
        }
    },
};