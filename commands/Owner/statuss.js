const axios = require('axios');
const pretty = require('prettysize');
module.exports = {
    name: 'statuss', //This is for the Name of the command
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
    notneeded: true,
    run: async (client, message, args, data) => {
    
            if (args[0].match(/[0-9a-z]+/i) == null)
                return message.channel.send("lol only use english characters.");
    
            args[0] = args[0].match(/[0-9a-z]+/i)[0];
    
            message.channel.send('Fetching `' + args[0] + '`. \n\n*This could take a few seconds*').then((msg) => {
                axios({
                    url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0],
                    method: 'GET',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    }
                }).then(response => {
                    axios({
                        url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0] + "/resources",
                        method: 'GET',
                        followRedirect: true,
                        maxRedirects: 5,
                        headers: {
                            'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                            'Content-Type': 'application/json',
                            'Accept': 'Application/vnd.pterodactyl.v1+json',
                        }
                    }).then(resources => {
                        let embedstatus = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .addField('**Status**', resources.data.attributes.current_state, true)
                            .addField('**CPU Usage**', resources.data.attributes.resources.cpu_absolute + '%')
                            .addField('**RAM Usage**', pretty(resources.data.attributes.resources.memory_bytes) + '  out of UNLIMITED MB')
                            .addField('**DISK Usage**', pretty(resources.data.attributes.resources.disk_bytes) + '  out of UNLIMITED MB')
                            .addField('**NET Usage**', 'UPLOADED: ' + pretty(resources.data.attributes.resources.network_tx_bytes) + ', DOWNLOADED: ' + pretty(resources.data.attributes.resources.network_rx_bytes))
                            .addField('**NODE**', response.data.attributes.node)
                            .addField('**FULL ID**', response.data.attributes.uuid)
                            .setTitle('🟢 Start | 🔄 Restart | 🔴 Stop \nReactions work for 20seconds.')
                        msg.edit("<@" + message.author.id + ">", embedstatus)
                        setTimeout(() => {
                            msg.react('🟢')
                            setTimeout(() => {
                                msg.react('🔄')
                                setTimeout(() => {
                                    msg.react('🔴')
                                }, 200)
                            }, 200)
                        }, 200)
    
    
                        const filter = (reaction, user) => (['🟢', '🔄', '🔴'].includes(reaction.emoji.name) && user.id === message.author.id);
                        const collector = msg.createReactionCollector(filter, {time: 20000});
                        collector.on('collect', async (reaction, user) => {
                            if (reaction.emoji.name === "🟢") {
                                axios({
                                    url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0] + "/power",
                                    method: 'POST',
                                    followRedirect: true,
                                    maxRedirects: 5,
                                    headers: {
                                        'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                                        'Content-Type': 'application/json',
                                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                                    },
                                    data: {"signal": "start"},
                                }).then(response => {
                                    message.reply(args[0] + ' server started!').then((msg2) => {
                                        setTimeout(() => {
                                            msg2.delete()
                                        }, 2000)
                                    })
                                });
                            } else if (reaction.emoji.name === "🔄") {
                                axios({
                                    url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0] + "/power",
                                    method: 'POST',
                                    followRedirect: true,
                                    maxRedirects: 5,
                                    headers: {
                                        'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                                        'Content-Type': 'application/json',
                                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                                    },
                                    data: {"signal": "kill"},
                                }).then(response => {
                                    setTimeout(() => {
                                        axios({
                                            url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0] + "/power",
                                            method: 'POST',
                                            followRedirect: true,
                                            maxRedirects: 5,
                                            headers: {
                                                'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                                                'Content-Type': 'application/json',
                                                'Accept': 'Application/vnd.pterodactyl.v1+json',
                                            },
                                            data: {"signal": "start"},
                                        }).then(response => {
                                            message.reply(args[0] + ' server restarted!').then((msg2) => {
                                                setTimeout(() => {
                                                    msg2.delete()
                                                }, 2000)
                                            })
                                        });
                                    }, 500)
                                });
                            } else if (reaction.emoji.name === "🔴") {
                                axios({
                                    url: 'https://panel.danbot.host' + "/api/client/servers/" + args[0] + "/power",
                                    method: 'POST',
                                    followRedirect: true,
                                    maxRedirects: 5,
                                    headers: {
                                        'Authorization': 'Bearer ' + 'danbot-vm3g5q',
                                        'Content-Type': 'application/json',
                                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                                    },
                                    data: {"signal": "kill"},
                                }).then(response => {
                                    message.reply(args[0] + ' server stopped!').then((msg2) => {
                                        setTimeout(() => {
                                            msg2.delete()
                                        }, 2000)
                                    })
                                });
                            }
                        });
    
                        collector.on('end', () => {
                            msg.reactions.removeAll();
                        });
                    });
                }).catch(error => {
                    msg.edit("Error: Can't find a server with that ID!")
                })
            })
    }}
