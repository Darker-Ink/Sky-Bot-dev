const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'queue',
    description: "Gives you the server queue list!",
    usage: "?queue",
    aliases: ["q"],
    category: "Music",
    disabledbug: true,
    run: async (client, message, args) => {
        try {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send(queueError)
        }
            if(!queue.length > 90) {
                return message.channel.send("This queue is to powerful I can't read it... Is it over 20 songs?")
            }
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");

        const embed = new MessageEmbed()
            .setDescription(`**Server Queue: ** \n\n  ${q}`)
            .setColor("BLUE")

        message.channel.send({ embeds: [embed] })
   } catch (err) {
    message.reply(errorMessage)
    errorhook.send('```\n' + err.stack + '\n```')
        }}
}