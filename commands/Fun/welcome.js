const discord = require("discord.js");

module.exports = {
    name: "welcome",
    description: "omg welcome!!",
    usage: "welcome <@mention>",
    aliases: ["wel"],
    category: "Fun",
  run: async (client, message, args) => {
    const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I can't welcome them do to not being able to add a welcomed role");
    } 

    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("Please mention the person who you are trying to welcome")
    }

 
    let role3 = message.guild.roles.cache.find(r => r.name === "welcomed");
    if(!role3) {
    return message.channel.send("Please Make A Role called __**welcomed**__ To use this command!")
    }

      let role2 = message.guild.roles.cache.find(r => r.name === 'welcomed')
      
       if(user.roles.cache.has(role2.id)) return message.channel.send(`I love your enthusiasm but **${message.mentions.users.first().username}** Has Already Been Welcomed!!`)


     let myrole = message.guild.roles.cache.find(r => r.name === "welcomed");

    let embed = new discord.MessageEmbed()
    .setTitle(`Welcome`)
    .setDescription(`<@${user.id}> Welcome To **${message.guild.name}** Enjoy your stay We Now have **${message.guild.memberCount} **Member's Thanks To you!`)
    .setColor("RANDOM")
    .setFooter(`Welcomed By ${message.author.username}`)
     .setImage("https://media1.tenor.com/images/0fdf526a8e8612e6df235d66ae1d3f83/tenor.gif?itemid=10068184")
    

    user.roles.add(myrole);
    message.channel.send(embed)
    }
  };