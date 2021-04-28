const Discord = require("discord.js");
const {
    sudo
} = require('weky')

module.exports = {
    name: "sudo",
    description: "sudo someone pretty cool ngl Owner only though due to abuse",
    ownerOnly: true,
    usage: "",
    aliases: ["ls", "sl"],
    category: "Owner",
    hidden: true,
    run: async (bot, message, args) => {
        const member = message.mentions.members.first()
        if (!member) return message.reply(`Couldn't find any user!`)
        const msg = args.slice(1).join(" ")
        if (!msg) return message.reply('What should the user say?')
        const sud = new sudo({
            message: message,
            text: msg,
            member: member,
        })
        sud.start()
    }
}