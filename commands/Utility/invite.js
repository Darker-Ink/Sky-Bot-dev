const { MessageEmbed } = require("discord.js")
require("../../ExtendedMessage");

module.exports = {
    name: 'invite',
    description: "Gives the Invite Link for this Bot to add it to your server!",
    usage: "?invite",
    aliases: ['sm', 'inv'],
    category: "Utility",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
        const embed = new MessageEmbed()
        .setDescription('You Can Invite me to Your server using the \'Click Me\' Button \n\n [Click Me](https://discord.com/oauth2/authorize?client_id=801908661470494751&permissions=8&scope=bot)')
        .setColor("BLUE")
        
        
        message.inlineReply(embed)
    }
}