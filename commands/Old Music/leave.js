module.exports = {
    name: 'leave',
    description: "Leaves The Voice Channel",
    aliases: ['dc', 'disconnect'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        let cursong = queue.songs[0];
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }
        client.distube.stop(message)
    }}