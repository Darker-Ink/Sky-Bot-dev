const Discord = require('discord.js');
const {
    inspect
} = require('util');
const fs = require('fs')
const config = require('../../config/config.json');

module.exports = {
    name: 'reloadall',
    ownerOnly: true,
    description: 'Reloads the commandFiles',
    aliases: ['ln'],
    usage: "reload <command>",
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
em = await message.channel.send(":warning: When all commands reloaded, all commands will be turned into latest changes! Press `✅` to confirm! Or being cancelled in `20` seconds. Only use this IF Needed, This can Really slow down the bot and in some cases Break the full bot, Please use `reload` If its only one command!")
            await em.react('✅')
            await em.react('❌')

            em.awaitReactions(r => ['✅', '❌'].includes(r.emoji.name), {
                max: 1,
                time: 20000
            }).then(async (collected) => {
                 r = collected.first()

                if (r.emoji.name === '✅') {
                    const folders = fs.readdirSync("./commands/");
            for (const files of folders) {
                const folder = fs
                    .readdirSync(`./commands/${files}/`)
                    .filter(file => file.endsWith(".js"));
                for (const commands of folder) {
                    const command = require(`../../commands/${files}/${commands}`);

                    delete require.cache[require.resolve(`../${files}/${commands}`)];
                    let commandName = commands.split(".")[0];
                    console.log("Reloaded Command: " + commands);
                    client.commands.set(commandName, command);
                }
            }
                    message.channel.send(`Reloaded: ${client.commands.size} Commands`)
                } else {
                    message.channel.send(":x: | Time's up! Reload commands actions cancelled!")
                }
            })}}