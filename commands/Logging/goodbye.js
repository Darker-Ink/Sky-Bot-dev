const {
    MessageEmbed
} = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'goodbye',
    description: "When user leaves server send message to channel",
    usage: "goodbye set #channel\ngoodbye custom <text>\ngoodbye disable",
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
                embed.setTitle("Error")
                    .setDescription("Missing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
                return message.channel.send(embed); // Error message
            }

            if (args[0].toLowerCase() === "set" && !args[1]) {
                embed.setTitle("Error")
                    .setDescription("Unable to find a valid channel.\n\nMissing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
                return message.channel.send(embed); // Error message
            }

            // Enable welcome messages and set channel to mentioned channel
            if (args[0].toLowerCase() === "set" && args[1]) {
                // Try finding the channel
                let goodbyeChannel = await client.tools.resolveChannel(args[1], message.guild);
                if (!goodbyeChannel) return; // Invalid channel

                data.guild.addons.goodbye.enabled = true; // Enable settings
                data.guild.addons.goodbye.channel = goodbyeChannel.id; // Set as channel ID
                data.guild.markModified("addons.goodbye");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Enabled Their GoodBye Message. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription(`Goodbye messages will be sent to ${goodbyeChannel}`)

                return message.channel.send(embed)
            }

            if (args[0].toLowerCase() === "custom" && !args[1]) {
                embed.setTitle("Error")
                    .setDescription("Unable to find a valid channel.\n\nMissing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
                return message.channel.send(embed); // Error message
            }

            if (args[0].toLowerCase() === "custom" && args[1]) {

                if (!data.guild.addons.goodbye.enabled) {
                    embed.setTitle("Error")
                        .setDescription("Please enable goodbye messages before setting up a custom message.\n\nMissing argument!\nVaribles:```{user.ping} - @Darkerink#1750\n{user.name} - DarkerInk\n{user.id} - 379781622704111626\n{user.tag} - Darkerink#1750\n{guild.name} - Supporting The Sky\n{guild.id} - 827204137829007361\n{guild.totalUser} - 50k```")
                    return message.channel.send(embed); // Error message
                }
                await args.shift()
                let msg = args.join(" ")
                if (msg.length > 1500) {
                    embed.setTitle("Error")
                        .setDescription("Messages exceeded 1500 characters, please make sure message is under 1500 characters.")
                    return message.channel.send(embed); // Error message
                }

                data.guild.addons.goodbye.message = msg;
                data.guild.markModified("addons.goodbye");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Edited Their GoodBye Custom message. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription("Custom message has been updated.\n\n**New Message**\n```" + msg + "```")
                return message.channel.send(embed); // Error message
            }

            if (args[0].toLowerCase() === "disable") {
                if (!data.guild.addons.goodbye.enabled) {
                    embed.setTitle("Successfully updated")
                        .setDescription("Goodbye messages were already disabled.")
                    return message.channel.send(embed); // Error message
                }

                data.guild.addons.goodbye.enabled = false;
                data.guild.addons.goodbye.channel = "";
                data.guild.markModified("addons.goodbye");
                await data.guild.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Disabled Their GoodBye Messages. \n\n \`\`\`json\n${result}\`\`\``))

                embed.setTitle("Successfully updated")
                    .setDescription("Goodbye messages have now been disabled.")
                return message.channel.send(embed); // Error message
            }

            embed.setTitle("Error")
                .setDescription("Missing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
            return message.channel.send(embed); // Error message

        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }

    },
};