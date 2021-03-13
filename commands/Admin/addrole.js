const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'addrole',
    description: "Adds the mentioned Role to the mentioned User. While using Role name to add, keep in mind it is case sensitive",
    usage: "?addrole <@member> <@role>/Role name",
    aliases: [],
    category: "Admin",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            const noPerms = new MessageEmbed()
            .setDescription(`You don\'t have permissions to add roles.`)
            .setColor("RED")
            return message.channel.send(noPerms)
        }
        
        const member = message.mentions.members.first()
        if(!member) {
            const addroleError = new MessageEmbed()
            .setDescription(`Please mention a member in order to give them the role`)
            .setColor("RED")
            return message.channel.send(addroleError)
        }
        args.shift()
        let roleToGive = message.mentions.roles.first()
        
        if(!roleToGive) {
            const addroleError2 = new MessageEmbed()
            .setDescription(`No Roles Provided`)
            .setColor("RED")
            return message.channel.send(addroleError2)
        }
        const mentionedPosition = member.roles.highest.position
        const selfPosition = message.member.roles.highest.position

        if(selfPosition <= mentionedPosition) {
            const posi = new MessageEmbed()
            .setDescription(`You cannot add role to this member as their role is higher/equal to yours.`)
            .setColor("RED")
            return message.channel.send(posi)
        }
        if(member.roles.cache.get(roleToGive.id)) {
            const addroleError3 = new MessageEmbed()
            .setDescription(`The member already has that role`)
            .setColor("RED")
            return message.channel.send(addroleError3)
        }
        member.roles.add(roleToGive)
        const embed = new MessageEmbed()
        .setDescription(`Role ${roleToGive} has been added to ${member}`)
        .setColor("BLUE")

        message.channel.send(embed)

        
    }
}