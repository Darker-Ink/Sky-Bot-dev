const {
    MessageEmbed
} = require("discord.js")
require("../../ExtendedMessage");

module.exports = {
    name: 'invite',
    description: "Gives the Invite Link for this Bot to add it to your server!",
    usage: "?invite",
    aliases: ['sm', 'inv'],
    category: "Utility",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setDescription(`You Can Invite me to Your server using the \'Click Me\' Button \n\n [Click Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147348471&scope=bot%20applications.commands)`)
            .setColor("BLUE")


        message.inlineReply(embed)
    }
}