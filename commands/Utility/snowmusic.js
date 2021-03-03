const { MessageEmbed } = require("discord.js")
require("../../ExtendedMessage");

module.exports = {
    name: 'snowmusic',
    description: "Gives the Invite Link for this Bot to add it to your server!",
    usage: "?SnowMusic",
    aliases: ['sm'],
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setDescription('You Can Invite me to Your server using the \'Click Me\' Button \n\n [Click Me](https://discord.com/api/oauth2/authorize?client_id=785838473550233631&permissions=8&scope=bot)')
        .setColor("BLUE")
        
        
        message.inlineReply(embed)
    }
}