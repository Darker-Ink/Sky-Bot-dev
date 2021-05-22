const { Message, MessageEmbed } = require('discord.js')

//const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'test',
    usage: '',
    description: "",
    category: "Admin",
    perms: ["MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_GUILD"],
    hidden: true,
    run: async(client, message, args) => {
        message.channel.send('A few things must have happened A. This worked or B. It didn\'t work and this message shouldn\'t be showing :\/')
    }}