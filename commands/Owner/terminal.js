// SHELL / TERMINAL / CONSOLE / EXEC command. 
const Discord = require('discord.js');
const process = require('child_process');
const config = require('../../config/config.json');

module.exports = {
    name: "terminal",
    description: "To install packages",
    ownerOnly: true,
    usage: "",
    aliases: ['console', 'shell'],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Please wait, this may take a white.`);

        process.exec(args.join(" "), (error, stdout) => {
            let result = (stdout || error);
            console.log(result, {
                code: "asciidoc",
                split: "\n"
            }).catch(err => message.channel.send(err))
        })

    }
}