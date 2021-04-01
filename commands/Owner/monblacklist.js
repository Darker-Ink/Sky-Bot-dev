const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name: "monblacklist",
    description: "",
    aliases: ["bl"],
    category: "Owner",
    disabled: true,
    run: async (client, message, args) => {
        try {
       
           if(message.content.includes('801908661470494751')) return message.channel.send('Bitch you thought');
        const person = message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])
        if(!person) return message.channel.send('User is not valid.')
            if(person.length > 20) return message.channel.send(`Please Give a ID`).then(m => m.delete({timeout: 10000}));
        blacklist.findOne({ id : person.id }, async(err, data) => {
 
            if (message.guild.member(`${person.id}`)) {
                if(err) throw err;
            if(data) {
               return message.channel.send(`**${person.user.tag}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : person.id })
                data.save()
                .catch(err => console.log(err))
          return message.channel.send(`\`${person.user.tag}\` has been added to blacklist.`)
            }
            } else if(err) throw err;
            if(data) {
                message.channel.send(`**${person.tag}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : person.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`\`${person.tag}\` has been added to blacklist.`)
            }
            
                 })
    } catch (err) {
      console.log('error');
      message.reply(`error time ${err.stack}`);
}}}