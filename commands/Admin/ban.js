const { Message, MessageEmbed } = require('discord.js')

//const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'ban',
    usage: '',
    description: "Bans a mentioned member",
    category: "Admin",
    run: async(client, message, args) => {
        try {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        if(!message.member.hasPermission('BAN_MEMBERS')) return 
         if (!args[0]) return message.channel.send('Debug fucking message pls work');
         let person =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])
       
            const allBans = await message.guild.fetchBans()

        if(allBans.get(person.id)) {
            const banerr = new MessageEmbed()
            .setDescription("The User is Already Banned")
            .setColor('#34ebe5')

            return message.channel.send(banerr)
        }
         //   if(person) {
           // const mentionedPosition = person.roles.highest.position
          //  const memberPosition = message.member.roles.highest.position
          //  const botPosition = message.guild.me.roles.highest.position

        //    if(memberPosition <= mentionedPosition) {
          //      const banerr2 = new MessageEmbed()
           // .setDescription("You Can Not Ban This Member Because their role is higher/equal to yours")
          //  .setColor('RANDOM')

            //return message.channel.send(banerr2)
            //} else if (botPosition <= mentionedPosition) {
              //  const banerr3 = new MessageEmbed()
         //   .setDescription("I Can Not Ban This Member Because their role is higher/equal to mine")
          //  .setColor('RANDOM')

         //   return message.channel.send(banerr3)
          //  }
       // }
            
         if(message.guild.members.cache.has(person.id)) {
            let reason =  `Banned by ${message.author.tag}`
            if(args[1]) reason = args.splice(1).join(" ")
             if(person.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send('You are not high enough in the role hierachy to ban this person.')
             message.guild.members.ban(person, { reason: reason })
             message.channel.send(`**${person.user.tag}** was banned`)

         } else {
            let reason =  `Banned by ${message.author.tag}`
            if(args[1]) reason = args.splice(1).join(" ")
             message.guild.members.ban(person, { reason: reason })
             message.channel.send(`**${person.tag}** was banned`)
             
         }
     }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}