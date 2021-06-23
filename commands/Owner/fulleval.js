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
        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();

        try {
            evaled = eval(args.join(' '));
            message.channel.send({ content: `${inspect(evaled)}`, split: true });
            console.log(inspect(evaled));
        } catch (err) {
        message.channel.send({ content: `${err}`, split: true });
        }
    }
};
