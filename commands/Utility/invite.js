const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'invite',
    description: "Gives the Invite Link for this Bot to add it to your server!",
    usage: "?invite",
    aliases: ['sm', 'inv'],
    category: "Utility",
    run: async (client, message, args) => {
        const embed1 = new MessageEmbed()
            .setDescription(`You Can Invite me to Your server using the \'Click Me\' Button \n\n [Click Me]()`)
            .setColor("BLUE")
//let botowner = []
let botowner = await client.application.fetch()
const embed = new MessageEmbed()
.setTitle(`Invite ${client.user.tag} Today`)
.setColor('YELLOW')
.setTimestamp()
.setDescription(`I see you want to Invite [${client.user.tag}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147348471&scope=bot%20applications.commands) If so Click on my name :D, If you Ever need support contact ${botowner.owner.username + '#' + botowner.owner.discriminator} or come join the [Support Server](https://discord.gg/3jqYu3R8Bj) And you will get help`)
.setFooter('Come invite me I\'m a great bot :D')
return message.reply({ embeds: [embed] })
    }
}