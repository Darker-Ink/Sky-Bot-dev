const {
    MessageEmbed
} = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'maintenance', //This is for the Name of the command
    usage: "maintenance <enable/disable> <reason>", //This lets the user Know how to use the command
    description: 'This is to Put the bot into or out of maintenance mode', //Gives a easy description
    category: "Owner", // What category the command should be in
    aliases: "mm", // Lets people use the command different way IE ping becomes p
    cooldown: 0, // The cooldown for the command
    ownerOnly: false, // If the command can only be used by the Owner
    hidden: true, // If you want the command to be hidden
    disabledbug: false, // If the command has been has been disabled due to a bug
    disabled: false, // If the command is still being Made
    perms: [], // The perms the user needs
    botperms: [], // The perms the bot needs
    darkinkonly: true, // If its only for DarkerInk
    run: async (client, message, data) => {
        if(args[1].toLowerCase() == "enable") {
            return message.channel.send('You enabled the command')
        }
        message.channel.send('You can use this')
        /*
            try {
                let embed = new Discord.MessageEmbed()
                    .setFooter(data.config.footer)
                    .setColor(data.config.color);
    
                // If no arguments return error
                if (!args[0]) {
                    embed.setTitle("Error")
                        .setDescription("Missing argument!```msglog set #channel\nmsglog disable```")
                    return message.channel.send(embed); // Error message
                }
    
                if (args[0].toLowerCase() === "set" && !args[1]) {
                    embed.setTitle("Error")
                        .setDescription("Unable to find a valid channel.\n\nMissing argument!```msglog set #channel\nmsglog disable```")
                    return message.channel.send(embed); // Error message
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
    
                    return message.channel.send(embed)
                }
    
                if (args[0].toLowerCase() === "disable") {
                    if (!data.Msg.addons.log.enabled) {
                        embed.setTitle("Successfully updated")
                            .setDescription("Message Logs were already disabled.")
                        return message.channel.send(embed); // Error message
                    }
    
                    data.Msg.addons.log.enabled = false;
                    data.Msg.addons.log.channel = "";
                    data.Msg.markModified("addons.log");
                    await data.Msg.save().then(result => client.channels.cache.get("827719237116231702").send(`Someone Disabled Their Message Logs. \n\n \`\`\`json\n${result}\`\`\``))
    
                    embed.setTitle("Successfully updated")
                        .setDescription("Message Logs have now been disabled.")
                    return message.channel.send(embed); // Error message
                }
    
                embed.setTitle("Error")
                    .setDescription("Missing argument!```msglog set #channel\nmsglog disable```")
                return message.channel.send(embed); // Error message
    
            } catch (err) {
                //Log error into the database
                message.reply(`Ran into an error while executing **msglog**`)
                console.log(err)
            }
    
        },
    };
    */
}}