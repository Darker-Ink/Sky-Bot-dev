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
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const stringOne = `[WARN] ${message.author.tag} Used the eval command`.yellow;
        console.log(stringOne)
        const code = args.join(" ");
        if(!code) return message.channel.send('Well. What the fuck do you want me to eval? Do i need to teach you how to use eval? Try doing this since you don\'t know how to use the eval command \`?eval message.channel.send(\'hi\')\` BOOM there')
        const command = args.shift().toLowerCase();
        if(!config.darkink.includes(message.author.id)) {
const responses = ["SyntaxError: Unexpected token F in JSON at position 48", "SyntaxError: Unexpected identifier", 'UnhandledPromiseRejectionWarning: DiscordAPIError: Missing Permissions', "TypeError: Cannot read property 'messages' of undefined", "UnhandledPromiseRejectionWarning: MongoError: bad auth : Authentication failed."]
                const dresponses = responses[Math.floor(Math.random() * responses.length)];
                const fakeembed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${dresponses}\n\`\`\``)
            .setColor('RED')
            return message.channel.send(fakeembed)
}
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            const embed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${evaled}\n\`\`\``)
            .setColor('GREEN')
            return message.channel.send({ embeds: [embed] })
        } catch (err) {
            const erroembed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${err.stack}\n\`\`\``)
            .setColor('RED')
            return message.channel.send(erroembed)
        }
    }
};
