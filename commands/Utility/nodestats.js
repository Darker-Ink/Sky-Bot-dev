const fetch = require('node-fetch');
const Discord = require('discord.js');
const {
    MessageEmbed
} = require("discord.js");
const discord = require("discord.js")

module.exports = {
    name: 'node-stats',
    description: "Gives you covid info",
    aliases: ['cif', 'ci'],
    usage: "",
    category: "Utility",
    run: async (client, message, args) => {
        let msg = await message.channel.send({
            embed: {
                "description": "Getting The Information...",
                "color": "YELLOW"
            }
        })

  
              let nodes = await fetch("https://danbot.host/nodeStatus")
                nodes = await nodes.json()
                return msg.edit(`${nodes.Node7}`)
        }}
