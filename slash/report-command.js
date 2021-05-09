const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const distube = require("distube");
module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'Play Some... MUSIC',
  minArgs: 2,
  expectedArgs: '<command> <bug>',
  callback: ({ client, interaction, message, args }) => {
      const [command, bug] = args
      const embed = `\`${command}\` Has been reported to the Devs, They will check it out as soon as possible`
      const channel = '839248172383731763'
      const reported = new MessageEmbed()
      .setTitle('Command Report')
      .addField("Command Reported", `${command}`, false)
      .addField("Reason For Report", `${bug}`)
    if (message) {
      message.reply('', { embed })
    }

    return channel.send(reported)
}}