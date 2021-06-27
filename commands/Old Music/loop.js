const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'loop',
    description: "Loops the Music/ Puts it on repeat!",
    usage: "?loop",
    aliases: ['loops'],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
        if(!channel) return message.reply('Please Join a VC to use this command')

       let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
                return message.channel.send({ embeds: [queueError] })
        }

        let mode = null

        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }


        mode = client.distube.setRepeatMode(message, mode)
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const embed = new MessageEmbed()
            .setDescription(`Loop is now set to: \`${mode}\` \n Use Loop multiple times to switch between loop modes.`)
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })
    }
}