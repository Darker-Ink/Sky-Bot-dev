/* Modules */
const canvas = require("canvas");
const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const jimp = require("jimp");

module.exports = {
    name: 'bonk',
    description: "bonk",
    usage: '?bonk <mention>',
    category: "Fun",
    cooldown: 400,
    run: async (client, message, args) => {
        if (!message.mentions.users.first()) {
            const noMentionedUserEmbed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Uh Oh!")
                .setDescription("Please mention someone to bonk them.");
            return message.channel.send(message.author, noMentionedUserEmbed);
        }

        const bonk = await jimp.read(`${__dirname}/../../Assets/bonk.jpeg`);
        const authorAvatar = await jimp.read(
            message.author.displayAvatarURL({
                format: "jpeg"
            })
        );
        const userToBonk = await jimp.read(
            message.mentions.users.first().displayAvatarURL({
                format: "jpeg"
            })
        );
        authorAvatar.circle();
        userToBonk.circle();
        bonk.resize(1000, 500);
        authorAvatar.resize(220, 220);
        userToBonk.resize(200, 200);
        bonk.composite(authorAvatar, 200, 50);
        bonk.composite(userToBonk, 650, 300);
        bonk.getBuffer(`image/jpeg`, (err, buffer) => {
            const bonkedAttachment = new MessageAttachment(buffer, "bonk.jpeg");
            const bonkEmbed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${message.mentions.users.first().username} Just Got Bonked!`)
                .attachFiles(bonkedAttachment)
                .setImage("attachment://bonk.jpeg");
            return message.channel.send(message.author, bonkEmbed);
        });
    },
};