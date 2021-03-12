const db = require('quick.db')
const Discord  = require('discord.js')

module.exports = {
    name: 'afk',
    description: "Go Afk And let people know why",
    usage: "?botstats",
    aliases: ['botinfo', 'botstat'],
    category: "Utility",
    run: async(client, message, args) => {
    
        const member = message.author.username
           const no1 = new Discord.MessageEmbed()
           .setDescription("Sorry AFK Command Can\'t use links due to a bug SORRY")
           .setColor("RED")
          let text = args.join(" ")
       if(text.includes("www") || text.includes("discord.gg") || text.includes("discordapp") || text.startsWith("https://")) return message.channel.send(no1)

      
        
    const status = new db.table("AFKs");
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    
        if(!text) { 
         text = "AFK"
        	
        } else { 
          text = text
        }

    
    if (!afk) {
      embed.setTitle(`${message.author.tag} AFK SET`)
      embed.setDescription(`\nMESSAGE:\n${text}`)
      status.set(`${message.author.id}_${message.guild.id}`, text)
    message.channel.send(embed)

    message.member.setNickname(`\[AFK\] ${member}`)
   }
    }
}