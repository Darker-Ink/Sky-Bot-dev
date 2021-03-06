const {
    MessageEmbed
} = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'welcome',
    usage: "welcome set #channel\nwelcome custom <text>\nwelcome disable",
    description: 'When user joins server send message to channel',
    category: "Admin",
    aliases: "",
    cooldown: 8,
    perms: ["ADMINISTRATOR"],
    botperms: ["MANAGE_WEBHOOKS"],
    run: async (client, message, args, data) => {
        try {

            let embed = new Discord.MessageEmbed()
                .setFooter(data.config.footer)
                .setColor(data.config.color);

            // If no arguments return error
            if (!args[0]) {
                embed.setTitle("ERROR")
                    .setDescription("You Didn't Use the command right\n\nwelcome set <#channel>\nwelcome custom <message>\nwelcome disable ")
                return message.channel.send({ embeds: [embed] }); // Error message
            }

            if (args[0].toLowerCase() === "set" && !args[1]) {
                return message.channel.send(`Couldn't find the channel \`${args[1]}\``)
            }

            // Enable welcome messages and set channel to mentioned channel
            if (args[0].toLowerCase() === "set" && args[1]) {
                // Try finding the channel
                let welcomeChannel = await client.tools.resolveChannel(args[1], message.guild);
                if (!welcomeChannel) return; // Invalid channel

                data.guild.addons.welcome.enabled = true; // Enable settings
                data.guild.addons.welcome.channel = welcomeChannel.id; // Set as channel ID
                data.guild.markModified("addons.welcome");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Enabled Their Welcome Message. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription(`welcome messages will be sent to ${welcomeChannel}`)

                return message.channel.send({ embeds: [embed] })
            }

            if (args[0].toLowerCase() === "custom" && !args[1]) {
                embed.setTitle("Error")
                    .setDescription("Unable to find a valid channel.\n\nMissing argument!```welcome set #channel\nwelcome custom <text>\nwelcome disable```")
                return message.channel.send({ embeds: [embed] }); // Error message
            }

            if (args[0].toLowerCase() === "custom" && args[1]) {

                if (!data.guild.addons.welcome.enabled) {
                    embed.setTitle("Error")
                        .setDescription("Please enable welcome messages before setting up a custom message.\n\nMissing argument!\nVaribles:```{user.ping} - @Darkerink#1750\n{user.name} - DarkerInk\n{user.id} - 379781622704111626\n{user.tag} - Darkerink#1750\n{guild.name} - Supporting The Sky\n{guild.id} - 827204137829007361\n{guild.totalUser} - 50k```")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }

                await args.shift()
                let msg = args.join(" ")
                if (msg.length > 1500) {
                    embed.setTitle("Error")
                        .setDescription("Messages exceeded 1500 characters, please make sure message is under 1500 characters.")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }

                data.guild.addons.welcome.message = msg;
                data.guild.markModified("addons.welcome");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Edited Their Welcome Custom Message. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription("Custom message has been updated.\n\n**New Message**\n```" + msg + "```")
                return message.channel.send({ embeds: [embed] }); // Error message
            }

            if (args[0].toLowerCase() === "disable") {
                if (!data.guild.addons.welcome.enabled) {
                    embed.setTitle("Successfully updated")
                        .setDescription("welcome messages were already disabled.")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }

                data.guild.addons.welcome.enabled = false;
                data.guild.addons.welcome.channel = "";
                data.guild.markModified("addons.welcome");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Disabled Their Welcome Message. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription("welcome messages have now been disabled.")
                return message.channel.send({ embeds: [embed] }); // Error message
            }

            embed.setTitle("Error")
                .setDescription("Missing argument!```welcome set #channel\nwelcome custom <text>\nwelcome disable```")
            return message.channel.send({ embeds: [embed] }); // Error message

        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }

    },
};