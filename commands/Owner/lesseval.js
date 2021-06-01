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
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const stringOne = `[WARN] ${message.author.tag} Used the eval command`.yellow;
        console.log(stringOne)
        const code = args.join(" ");
        const command = args.shift().toLowerCase();
        if(!config.darkink.includes(message.author.id)) {
const responses = ["SyntaxError: Unexpected token F in JSON at position 48", "SyntaxError: Unexpected identifier", 'UnhandledPromiseRejectionWarning: DiscordAPIError: Missing Permissions', "TypeError: Cannot read property 'messages' of undefined", "UnhandledPromiseRejectionWarning: MongoError: bad auth : Authentication failed."]
                const dresponses = responses[Math.floor(Math.random() * responses.length)];
                const fakeembed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${dresponses}\n\`\`\``)
            .setColor('GREEN')
            return message.channel.send(dresponses)
}
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            const embed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${evaled}\n\`\`\``)
            .setColor('GREEN')
            return message.channel.send(embed)
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
