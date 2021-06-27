const {
    MessageEmbed,
    MessageManager
} = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    name: 'shuffle',
    description: "Pause Music",
    usage: "?pause",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        const channel = message.member?.voice.channel;
        if(!channel) return message.reply('Please Join a VC to use this command')
        if (!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
                return message.channel.send({ embeds: [queueError] })
        }

        client.distube.shuffle(message)
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");
	 const embed = new Discord.MessageEmbed()
	.setTitle(`${client.emotes.success} Queue Shuffled!`)
    .setDescription(`New Queue:\n ${q}`)
     .setColor("GREEN")
     message.channel.send({ embeds: [embed] })
    }
}