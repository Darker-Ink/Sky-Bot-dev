const {
    MessageEmbed
} = require('discord.js')
const {
    inspect
} = require('util');
const fs = require('fs')
const config = require('../../config/config.json');

module.exports = {
    name: 'dm',
    ownerOnly: true,
    description: 'dms a user',
    usage: "dm <message>",
    category: "Owner",
	hidden: true,
    run: async (client, message, args) => {
        try {
            let id = await client.users.fetch(args[0]);
            let darkmsg = args.slice(1).join(" ")
            if (!id) {
                const noidmsg = new MessageEmbed()
                    .setDescription("You need a dumb id dumbass ||prob darkerink he is really dumb <:dumb:820084401370562571>||")
                    .setColor("BLUE")

                return message.channel.send(noidmsg)
            }
            if (!darkmsg) {
                const nomsgerror = new MessageEmbed()
                    .setDescription(`What you want to send a blank message? why just why. Send ${id.tag} a damn message`)
                    .setColor("BLUE")

                return message.channel.send(nomsgerror)
            }


            client.users.cache.get(`${args[0]}`).send(`${darkmsg}`);
            return message.channel.send(`Message sent to ${id.tag}`)
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')    
        }
    }
}