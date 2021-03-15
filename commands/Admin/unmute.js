const { MessageEmbed } = require("discord.js");



module.exports = {
    name: "unmute",
    description: "Use This To Unmute A Muted Person!",
    category: "Admin",
    run: async (client, message, args) => {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Sorry, You Don\'t Have Permissions To Unmute Anyone!");
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Sorry, But I don\'t Have Permissions To Unmute Anyone!")

        }

        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send("Please Mention The User I Need To Unmute!")
        }
        if (user.id === message.author.id) {
            return message.channel.send("You\'re Not Muted If You Just Sent A Command :)")
        }


        let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')


        if (user.roles.cache.has(muterole)) {
            return message.channel.send("Given User Is Already Unmuted!")
        } 

const embed = new MessageEmbed()
      .setAuthor(`You Unmuted ${message.mentions.users.first().username}`)
      .setFooter("Enjoy And Don\'t Do something that\'s gonna get you MUTED")
      .setColor("BLUE")

        user.roles.remove(muterole)
        await message.channel.send(embed)
        user.send(`You Are Unmuted!`)








    }
}