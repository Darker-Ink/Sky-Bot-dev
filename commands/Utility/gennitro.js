const Discord = require('discord.js');
const {
    MessageEmbed
} = require("discord.js");
const discord = require("discord.js")

module.exports = {
    name: "gennitro",
    description: "Get a Nitro Gift from the owner <3",
    usage: "GenNitro",
    aliases: ["gen"],
    category: "Utility",
    cooldown: 500,
    run: async (client, message, args) => {

        message.channel.send(`Connecting to Discord Database...`)
            .then(msg => {
                setTimeout(function() {
                    msg.edit(`Connecting to Discord Database\nConnected!`)
                }, 5000);
                setTimeout(function() {
                    msg.edit(`Connecting to Discord Database\nConnected!\nGenerating Nitro.....`)
                }, 7000);
                setTimeout(function() {
                    msg.edit(`Connecting to Discord Database\nConnected!\nGenerating Nitro.....\nFaild To generate Nitro...`)
                }, 8000);
                setTimeout(function() {
                    msg.edit(`Connecting to Discord Database\nConnected!\nGenerating Nitro.....\nFaild To generate Nitro...\nTrying again`)
                }, 9000)
                setTimeout(function() {
                    msg.edit(`‎`)
                }, 10000);
                setTimeout(function() {
                    let embed = new discord.MessageEmbed()
                        .setTitle("Nitro Made")
                        .setColor("GREEN")
                        .setThumbnail(`https://media.tenor.co/videos/3432b2ad2ad3916d57ff23766d756e72/mp4`)
                        .setDescription("Click The Nitro Button to Claim your Nitro! [Nitro](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
                    return msg.edit(embed)
                }, 10000)
            })
    }
}