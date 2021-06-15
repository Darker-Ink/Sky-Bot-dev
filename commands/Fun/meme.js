const randomPuppy = require('random-puppy')
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'meme',
    description: "Sends A Random Meme!",
    usage: "?meme",
    category: "Fun",
    run: async (client, message, args) => {
        const subReddits = ['me\_irl', 'dankmemes']
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)


        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setImage(img)
            .setTitle(`Meme from ${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter('If the video isn\'t loading its \nbecause its a .mp4 and it won\'t work sorry')



        message.channel.send({ embeds: [embed] });

    }
}