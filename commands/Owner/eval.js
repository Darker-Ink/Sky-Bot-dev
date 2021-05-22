const {
    MessageEmbed
} = require('discord.js');
const {
    inspect
} = require('util');
const config = require('../../config/config.json');
const fs = require('fs')
const colors = require('colors');

module.exports = {
    name: "eval",
    description: "",
    ownerOnly: true,
    usage: "",
    aliases: ["eval", "ev"],
    category: "Owner",
    hidden: true,
    run: async (client, message) => {
        const stringOne = `[WARN] ${message.author.tag} Used the eval command`.yellow;
        console.log(stringOne)
        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();

        try {
            evaled = await eval(args.join(' '));
            message.channel.send(inspect(evaled));
            console.log(inspect(evaled));
        } catch (err) {
            console.log(err);
            message.reply(`There was an error during evaluation, \n\n**${err.stack}**`);
            client.channels.cache.get("827716948087013406").send(`Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
};