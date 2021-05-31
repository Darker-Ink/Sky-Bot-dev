const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const config = require('../config/config.json')
const Maintenance = require('../models/maintenance.js')

module.exports = {
    type: 'message',
    run: async (client, message) => {
        try {

            let guildDB = await client.data.getGuildDB(message.guild.id)
            let msgDB = await client.data.getMsgDB(message.guild.id)
            if (message.channel.type === "text" && !message.guild.me.permissions.has("SEND_MESSAGES")) return;
            // If the message is a dm doesn't reply used to stop errors with afk
            //db stuff
            global.settings = await Guild.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err)
                if (!guild) {
                    const newGuild = new Guild({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                        prefix: '!'
                    })

                    newGuild.save()
                        //sends a msg to the channel saying someone has been added to the database
                        .then(result => client.channels.cache.get("827719237116231702").send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                        .catch(err => console.error(err));

                    //used to stop a error
                    return console.log('I wasn\'t here')
                }
            });

            const prefix = settings.prefix;
         //   if (!message.guild) return;
            //if someone pings the bot says the prefix in the server
            if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
                return message.channel.send(`You need the prefix? Well thats Fine its \`\`${settings.prefix}\`\``);
            };

            global.errorMessage = `oh No You got a error, Please report this command by doing ${settings.prefix}report-command <command_name> <reason_for_report>`

            if (!message.content.startsWith(prefix)) return;

            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();


            if (cmd.length === 0) return;
            global.command = client.commands.get(cmd);
            //if (cmd.name = null) return; .toString()

            try {
                if (!command) command = client.commands.find((command) => command.aliases && command.aliases.includes(cmd));
                if (!command) return;
                global.settingsss = await Maintenance.findOne({
                    ino: message.author.id
                }, (err, guild) => {
                    console.log(err)
                    /*
                    if (err) console.error(err)
                    if (!guild) {
                        const newMaintenance = new Maintenance({
                            _id: mongoose.Types.ObjectId(),
                            ino: message.author.id,
                            reason: '',
                            enabled: false
                        })
        
                        newMaintenance.save()
                            //sends a msg to the channel saying someone has been added to the database
                            .then(result => client.channels.cache.get("827719237116231702").send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                            .catch(err => console.error(err));
        
                        //used to stop a error
                        return console.log('')
                    }*/
                });
                global.errorcommand = command//.replace(settings.prefix, "")           
                global.errorMessage = `oh No You got a error, Please report this command by doing \`${settings.prefix}report-command ${errorcommand.name} <reason_for_report>\``
                if(!command && settingsss.enabled == 'true') {
                    const embed = new Discord.MessageEmbed()
                   .setTitle('In Maintenance Mode')
                   .setDescription('Maintenance Mode Is enabled')
                   .addField('reason', `${settingsss.reason}`)
                   .setColor('GREEN')
                   .setTimestamp()
                  return message.channel.send(embed)
                   }
                if (command.ownerOnly && !config.owners.includes(message.author.id)) {
                    return
                }
                if (command.disabled && !config.beta.includes(message.author.id)) {
                    return message.reply('This Command Is disabled Due to It being in develpment Please Check back later!');
                }
                if (command.disabledbug && !config.beta.includes(message.author.id)) {
                    return message.reply('This Command Is disabled Due to a Bug Please Check back later!');
                }
                if (command.snupe && !config.beta.includes(message.author.id)) {
                    return message.reply(`The Snipe Command Is Disabled As of Now, Please Use Message Logs by doing \`${prefix}msglog set #channel\` The snipe command will be enabled soon but I don't know when.`);
                }
                if (!message.member.permissions.has(command.perms)) {
                    const mIm = (`${command.perms}`)
                    message.channel.send(`You do Not have the right perms to use this command You need \`\`${command.perms.join(", ")}\`\` To use this command!`, command.perms)
                    return;
                }
                if (!message.guild.me.permissions.has(command.botperms)) {
                    const mIm = (`${command.perms}`)
                    message.channel.send(`I am **Missing Perms** Please Add these: \`\`${command.botperms.join(", ")}\`\``, command.botperms)
                    return;
                }
                if (command.darkinkonly && !config.darkink.includes(message.author.id)) {
                    return message.channel.send('[DEBUG] Seems like you can\'t use this command')
                }
                const {
                    cooldowns
                } = client;

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 3) * 1000;

                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                    }
                }

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            } catch (err) {
                console.log(err)
            }
            if (command)

                try {
                    let userDB = await client.data.getUserDB(message.author.id);
                    let data = {};
                    data.config = config;
                    data.user = userDB;
                    data.guild = guildDB;
                    data.Msg = msgDB;
                    data.cmd = cmd;
                    command.run(client, message, args, data);
                } catch (err) {
                    console.log(err)
                }
        } catch (err) {
            console.log(err)
        }
    }
}
