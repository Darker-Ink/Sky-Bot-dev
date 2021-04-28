// SHELL / TERMINAL / CONSOLE / EXEC command. 
const Discord = require('discord.js');
const client = new Discord.Client();
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

        if (args.length < 1) {
            return message.channel.send(`You didn't send anything`).then(m => m.delete({
                timeout: 10000
            }));
        };
        const msg = await message.channel.send(`Please wait, this may take a white.`);
        msg.delete({
            timeout: 4000
        });
        process.exec(args.join(" "), (error, stdout) => {
            let result = (stdout || error);
            message.channel.send(result, {
                code: "asciidoc",
                split: "\n"
            }).catch(err => message.channel.send(err))
        })

    }
}