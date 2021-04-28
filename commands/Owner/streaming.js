const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const config = require('../../config/config.json');
const fs = require('fs')
const colors = require('colors');

module.exports = {
    name: "streaming",
    description: "Change the status",
    ownerOnly: true,
    usage: "",
    aliases: ['str', 'stream'],
    category: "Owner",
    hidden: true,
  run: async (client, message, args) => {
      const stringOne = `[WARN] ${message.author.tag} Changed The Status`.red;
      console.log(stringOne)
   const stats = args[0]
  const dark = args.slice(1).join(" ")

      const statss = (`${stats}`)
      const content = (`${dark}`)
client.user.setPresence({
      activity: {
        name: content,
        type: 'STREAMING',
        url: stats,
  }})}}