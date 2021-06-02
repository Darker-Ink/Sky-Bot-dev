require("../../ExtendedMessage");
const Discord = require('discord.js')
const ms = require('ms')
const os = require('os')
module.exports = {
    name: "ping",
    description: "check the bots heartBeat",
    cooldown: 0,
    category: "Utility",
    run: async (client, message, args) => {
        const dt = new Date(message.createdTimestamp);
        const responses = [
    'I-It\'s not like I wanted to say pong or anything...',
    'Pong...',
    'Woo! A secret command!',
    'Ping! ...I mean **pong!**',
    'Does anyone even use this?',
    'At your service!',
    'Testing, testing, 1, 2, 3!'
  ];
        const dresponses = responses[Math.floor(Math.random() * responses.length)];
			message.channel.send(`**API:**\`${new Date() - dt}ms\`\n\n**WS:**\`${client.ws.ping}ms\`\n\n**Linux Uptime:**\`${ms(os.uptime() * 1000, { long: true })}\``)
    }}
