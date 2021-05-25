const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "utiltest",
   description: "",
    usage: "",
    aliases: [],
    category: "Utility",
  run: async (client, message, args) => {
    const owner = await guild.fetchOwner()
      message.channel.send(`${owner.tag}`)
  }}