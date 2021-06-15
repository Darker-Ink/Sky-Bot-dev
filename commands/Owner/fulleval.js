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
    name: "fulleval",
    description: "",
    ownerOnly: true,
    usage: "",
    aliases: ["feval"],
    category: "Owner",
    hidden: true,
    run: async (client, message) => {
        const stringOne = `[WARN] ${message.author.tag} Used the eval command`.yellow;
        console.log(stringOne)
        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();

        try {
            evaled = await eval(args.join(' '));
            message.channel.send({ content: inspect(evaled) });
            console.log(inspect(evaled));
        } catch (err) {
        message.channel.send({ content: err });
        }
    }
};
