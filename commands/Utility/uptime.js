const Discord = require('discord.js');
let days = 0;
let week = 0;
module.exports = {
    name: 'uptime',
    usage: "Info",
    description: 'Get da Uptime',
    category: "Utility",
    cooldown: 8,
    run: async (client, message, args) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        message.channel.send(`${uptime}`)
    }
}