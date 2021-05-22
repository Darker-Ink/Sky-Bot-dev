const {
    MessageEmbed
} = require('discord.js')
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "cursong",
    category: "Music",
    description: "Provides you the lyrics of the song",
    usage: `lyrics <song name>`,
    aliases: [],
    cooldown: 120,
    run: async (client, message, args) => {

let queue = client.distube.getQueue(message);

            if (!queue) {
                const queueError = new MessageEmbed()
                    .setDescription("There is Nothing Playing, Trying adding something!")
                    .setColor("RED")
                return message.channel.send(queueError)
            }
            let cursong = queue.songs[0];
        let finalMsg = cursong.name
		.replace("(Official Music Video)", ``)
        .replace("(Music Video)", ``)
        .replace("(Official Audio)", "")
        .replace("(Official)", "")
        let lyrics = await lyricsFinder(finalMsg) || "Not Found!";
        for (let i = 0; i < lyrics.length; i += 2000) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2000));
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Lyrics`)
                .setDescription(toSend)
            message.channel.send(embed)
            console.log(lyrics)
        }
    }
}