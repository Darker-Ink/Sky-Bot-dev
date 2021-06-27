const {
    MessageEmbed
} = require("discord.js")
const {
    setFilter
} = require('distube')

module.exports = {
    name: 'filter',
    description: "Set Music Filter! \n Filter Option: `3d, bassboost, echo, karaoke, nightcore, vaporwave`",
    usage: "?filter <filterOption>",
    aliases: ['setfilter'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }

        let filterOption = args[0];
        if (!args[0]) {
            const filterOptions = new MessageEmbed()
                .setTitle(`**Filter Options:**`)
                .setDescription(`\`3d, bassboost, echo, karaoke, nightcore, vaporwave\``)
                .setColor("BLUE")

            return message.channel.send(filterOptions)
        }

        try {
            await client.distube.setFilter(message, filterOption)
            const embed = new MessageEmbed()
                .setDescription('Music Filter has been set to: ' + `(${filterOption})` || 'Off')
                .setColor("BLUE")

            return message.channel.send({ embeds: [embed] })
        } catch (error) {
            return;
        }



    }
}