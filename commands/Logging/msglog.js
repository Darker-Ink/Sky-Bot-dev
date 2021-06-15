const {
    MessageEmbed
} = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'msglog',
    usage: "msglog set #channel",
    description: 'When a user deletes/edits a message sends it to set channel',
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
                        .setDescription("Missing argument!```msglog set #channel\nmsglog disable```")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }
    
                if (args[0].toLowerCase() === "set" && !args[1]) {
                    embed.setTitle("Error")
                        .setDescription("Unable to find a valid channel.\n\nMissing argument!```msglog set #channel\nmsglog disable```")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }
    
                // Enable welcome messages and set channel to mentioned channel
                if (args[0].toLowerCase() === "set" && args[1]) {
                    // Try finding the channel
                    let welcomeChannel = await client.tools.resolveChannel(args[1], message.guild);
                    if (!welcomeChannel) return; // Invalid channel
    
                    data.Msg.addons.log.enabled = true; // Enable settings
                    data.Msg.addons.log.channel = welcomeChannel.id; // Set as channel ID
                    data.Msg.markModified("addons.log");
                    await data.Msg.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Enabled Their Message Logs. \n\n \`\`\`json\n${result}\`\`\``))
    
                    embed.setTitle("Successfully updated")
                        .setDescription(`Message Logs will be sent to ${welcomeChannel}`)
    
                    return message.channel.send({ embeds: [embed] })
                }
    
                if (args[0].toLowerCase() === "disable") {
                    if (!data.Msg.addons.log.enabled) {
                        embed.setTitle("Successfully updated")
                            .setDescription("Message Logs were already disabled.")
                        return message.channel.send({ embeds: [embed] }); // Error message
                    }
    
                    data.Msg.addons.log.enabled = false;
                    data.Msg.addons.log.channel = "";
                    data.Msg.markModified("addons.log");
                    await data.Msg.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Disabled Their Message Logs. \n\n \`\`\`json\n${result}\`\`\``))
    
                    embed.setTitle("Successfully updated")
                        .setDescription("Message Logs have now been disabled.")
                    return message.channel.send({ embeds: [embed] }); // Error message
                }
    
                embed.setTitle("Error")
                    .setDescription("Missing argument!```msglog set #channel\nmsglog disable```")
                return message.channel.send({ embeds: [embed] }); // Error message
    
            } catch (err) {
                message.reply(errorMessage)
                errorhook.send('```\n' + err.stack + '\n```')
            }
    
        },
    };