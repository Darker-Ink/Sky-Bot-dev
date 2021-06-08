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


        if (!args[0] || args[0].toLowerCase() === "all" || args[0].toLowerCase() === "global") {
                let nodes = await fetch("https://disease.sh/v3/covid-19/all")
                nodes = await nodes.json()
                return msg.edit(`${Node7.is_vm_online}`)
        }}}
