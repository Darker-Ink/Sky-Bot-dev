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
    name: "lesseval",
    description: "",
    ownerOnly: true,
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const stringOne = `[WARN] ${message.author.tag} Used the eval command`.yellow;
        console.log(stringOne)
        const code = args.join(" ");
        const command = args.shift().toLowerCase();

        try {
            let evaled = await eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            const embed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${evaled}\n\`\`\``)
            return message.channel.send(embed)
        } catch (err) {
            console.log(err);
            message.reply(`There was an error during evaluation, \n\n**${err.stack}**`);
            client.channels.cache.get("827716948087013406").send(`Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
};
