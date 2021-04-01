const Guild = require('../../schema.js')
const { Message } = require('discord.js')
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');

module.exports = {
    name: "setprefix",
    description: "Sets the prefix in that server!",
    aliases: ["prefix"],
    category: "Admin",
    run: async (client, message, args) => {
        try {
           if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You do not have permission to use this command.").then(m => m.delete(15000));
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return; //the quick db is used for my blacklist command

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

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });
		
        //if (args[0].length > 7) {
          //  return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\` and that is under \`5\``).then(m => m.delete({timeout: 10000}));
        //};
        let commandName = args[0].toLowerCase()
        
        if(commandName.length > 5) return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\` and that is under \`5\``).then(m => m.delete({timeout: 10000}));
       

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
    }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}