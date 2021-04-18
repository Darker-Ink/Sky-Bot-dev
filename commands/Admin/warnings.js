const warnSchema = require("../../models/warnSchema");
const mongoose = require("mongoose");
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "warnings",
    description: "Check how many warnings a member have had",
    usage: "?warnings <@member>",
    aliases: ["warnlist", "listwarnings", "warns"],
    category: "Admin",
    run: async (client, message, args) => {
        try {
            const mentionedUser = message.mentions.users.first() || message.member;

            const warnDoc = await warnSchema
                .findOne({
                    guildID: message.guild.id,
                    memberID: mentionedUser.id,
                })
                .catch((err) => console.log(err));

            if (!warnDoc || !warnDoc.warnings.length) {
                return message.channel.send(`${mentionedUser} has no warnings`);
            }

            const data = [];

            for (let i = 0; warnDoc.warnings.length > i; i++) {
                data.push(`**ID:** ${i + 1}`);
                data.push(`**Reason:** ${warnDoc.warnings[i]}`);
                data.push(
                    `**Moderator:** ${await message.client.users
          .fetch(warnDoc.moderator[i])
          .catch(() => "Deleted User")}`
                );
                data.push(
                    `**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`
                );
            }

            const embed = new MessageEmbed()
                // .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: false }))
                .setColor("BLUE")
                .setDescription(data.join("\n"));

            message.channel.send(embed);
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}