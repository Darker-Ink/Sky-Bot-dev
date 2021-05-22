const db = require('quick.db');
const discord = require('discord.js');
const Discord = require('discord.js');
const fs = require("fs");
const colors = require('colors');
const debug = '[DEBUG] Message.js Is working!'.blue;
const config = require('../config/config.json')

module.exports = {
    type: 'message',
    run: async (client, message) => {
        try {
            //console.log(`${debug}`)
            if (message.channel.type === "text" && !message.guild.me.permissions.has("SEND_MESSAGES")) return;
            // If the message is a dm doesn't reply used to stop errors with afk

            if (message.channel.type == "dm") return;
            //getting the afk info
            const member = message.author.username
            let afk = new db.table("AFKs")
            const authorStatus = await afk.get(`${message.author.id}_${message.guild.id}`)

            const mentioned = message.mentions.members.first()

            if (mentioned) {


                const status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);

                if (status) {
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle(`HEY Leave ${mentioned.user.tag} Alone they are afk`)
                        .setColor("GREEN")
                        .setDescription(`${mentioned.user.tag} is AFK \n ${status}`)

                    message.channel.send(embed1).then(i => i.delete({
                        timeout: 900000
                    }));


                }

            }
            if (authorStatus) {
                afk.delete(`${message.author.id}_${message.guild.id}`)
                const embed2 = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Welcome Back ${message.author.tag}, you are no longer AFK`)

                message.channel.send(embed2).then(i => i.delete({
                    timeout: 10000
                }));
                message.member.setNickname(` `)
            }

        }catch (err) {
            console.log(err)
        }}}