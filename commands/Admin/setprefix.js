const Guild = require('../../schema.js')
const {
    Message
} = require('discord.js')
const {
    MessageEmbed
} = require("discord.js");
const mongoose = require('mongoose');

module.exports = {
    name: "setprefix",
    description: "Sets the prefix in that server!",
    aliases: ["prefix"],
    category: "Admin",
    perms: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
        try {
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

            //if (args[0].length > 7) {
            //  return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\` and that is under \`5\``).then(m => m.delete({timeout: 10000}));
            //};
            let commandName = args[0].toLowerCase()

            if (commandName.length > 5) return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\` and that is under \`5\``).then(m => m.delete({
                timeout: 10000
            }));


            await settings.updateOne({
                guildName: message.guild.name,
                prefix: args[0]
            }).then(result => client.channels.cache.get("827719237116231702").send(`Someone Edited Their Prefix. \n\n \`\`\`json\nprefix: ${args[0]}\nguildName: ${message.guild.name}\`\`\``))

            return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}