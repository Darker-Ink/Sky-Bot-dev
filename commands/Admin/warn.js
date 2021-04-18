const warnSchema = require("../../models/warnSchema");
const mongoose = require("mongoose");
const {
    MessageEmbed
} = require("discord.js");


module.exports = {
    name: "warn",
    description: "Warn Someone",
    usage: "?warn <@mention> [reason]",
    aliases: [],
    category: "Admin",
    perms: ["KICK_MEMBERS", "BAN_MEMBERS"],
    run: async (client, message, args) => {
        try {
            const mentionedUser =
                message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!mentionedUser) {
                const warnError2 = new MessageEmbed()
                    .setDescription("You Need to mention a Member to warn them!")
                    .setColor("RED");
                return message.channel.send(warnError2);
            }
            const mentionedPosition = mentionedUser.roles.highest.position
            const memberPosition = message.member.roles.highest.position

            if (memberPosition <= mentionedPosition) {
                const warnError3 = new MessageEmbed()
                    .setDescription("You Cannot warn this member as thier role position is higher/equal to yours")
                    .setColor("RED")
                return message.channel.send(warnError3)
            }

            const reason = args.slice(1).join(" ") || "Not Specified";

            let warnDoc = await warnSchema
                .findOne({
                    guildID: message.guild.id,
                    memberID: mentionedUser.id,
                })
                .catch((err) => console.log(err));

            if (!warnDoc) {
                warnDoc = new warnSchema({
                    guildID: message.guild.id,
                    memberID: mentionedUser.id,
                    warnings: [reason],
                    moderator: [message.member.id],
                    date: [Date.now()],
                });

                await warnDoc.save().catch((err) => console.log(err));
                return message.channel.send(`**Successfully Warned ${mentionedUser}**`)
            } else {
                if (warnDoc.warnings.length >= 500) {
                    return message.channel.send(
                        "Ok How the fuck are you seeing this message? Legit Dm darkerink for a prize if you see this because 500 warns??"
                    );
                }

                warnDoc.warnings.push(reason);
                warnDoc.moderator.push(message.member.id);
                warnDoc.date.push(Date.now());

                await warnDoc.save().catch((err) => console.log(err));

                const embed = new MessageEmbed()
                    .setDescription(`Warned **${mentionedUser}** \n Reason: **${reason}**`)
                    .setColor("BLUE");

                return message.channel.send(embed);
            }
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}