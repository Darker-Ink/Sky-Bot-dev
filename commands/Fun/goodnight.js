const Discord = require('discord.js')
// linklel tried to setup a command but failed miserably.
const db = require('quick.db')


module.exports = {
    name: 'goodnight',
    description: 'Bot gives you a goodnight message',
    aliases: ['gn', 'night'],
    usage: 'goodnight',
    category: "Fun",
    cooldown: 0,
    run: async (client, message, args) => {
        const responses = [
    'I will see you in the morning',
    'Nightie Night',
    'Cya have a good night',
    'Sweet Dreams!',
    'Have a Great Night',
	'Good night sweetie',
	'My sweetheart have some nice dreams'
  ];
        const dresponses = responses[Math.floor(Math.random() * responses.length)];
        const embed = new Discord.MessageEmbed()
            .setTitle("Good Night")
            .addField(`Good Night From ${client.user.tag}`, `${dresponses}`, false)
            .setColor("RANDOM") //Nice
            .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}