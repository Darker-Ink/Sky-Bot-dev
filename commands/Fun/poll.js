const {
    MessageEmbed
} = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'poll',
    description: "Get a poll on something",
    usage: "?poll Is darkerink cool?",
    aliases: [],
    category: "Fun",
    run: async (client, message, args) => {
        //let channel = message.mentions.channels.first() Don't fuck with this I will be using it when I have a dc acc
        let pollmsg = args.slice(0).join(" ")
        if (!pollmsg) {
            return message.channel.send('What are you going to vote on? Blank V blank?')
        }
        const poll = (pollmsg)

        message.channel.send(poll).then(sentEmbed => {
            sentEmbed.react("👍")
            sentEmbed.react("👎")
        })
    }
}