const Discord = require('discord.js');
module.exports = {
    name: 'welcome-info',
    ownerOnly: false,
    usage: "?welcome-info",
    description: 'Get Info On welcome and goodbye',
    category: "Utility",
    cooldown: 8,
    run: async (client, message, args) => {
        message.channel.send('\`\`\`JOIN INFO\`\`\`\n**{guild.totalUser}**: Amount of members after join\n**{guild.id}**: the guild ID\n**{guild.name}**: The guild name\n**{user.tag}** The Members tag\n**{user.id}**: users ID\n**{user.ping}**: ping the user that joined\n**{user.name}**: Users name\n\n```GOODBYE INFO```\n**{guild.totalUser}**: Amount of members after join\n**{guild.id}**: the guild ID\n**{guild.name}**: The guild name\n**{user.tag}** The Members tag\n**{user.id}**: users ID\n**{user.ping}**: ping the user that joined\n**{user.name}**: Users name')
    }
}