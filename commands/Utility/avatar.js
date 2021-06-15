const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'avatar',
    description: "Get a user's/your Avatar",
    usage: "?avatar <mention>",
    aliases: ["av", 'ava'],
    category: "Utility",
    run: async (client, message, args) => {

        try {
            const member = message.mentions.users.first() || message.author;
            const avatar = member.displayAvatarURL({
                dynamic: true,
                size: 1024
            })

            const embed = new MessageEmbed()
                .setTitle(`${member.tag}\'s Avatar`)
                .setImage(avatar)
            	.setTimestamp();
            message.channel.send(embed)
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')    
        }
    }
}