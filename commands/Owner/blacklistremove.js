const Discord = require('discord.js');
const db =require("quick.db")
const config = require('../../config/config.json');
module.exports = {
    name: "blacklistremove",
    description: "To blacklist the abusers",
    ownerOnly: true,
    usage: "blr",
    aliases: ["blr"],
    category: "Owner",
  run: async (client, message, args) => {
    try {
    let user = await client.users.fetch(args[0]);
    if(!user) return message.channel.send(`Invalid user or id`);
  
    let fetched = db.get(`blacklist_${user.id}`)
    if(!fetched) {
      return message.channel.send(`This user is not blacklisted`);
    } 
    else {
      db.delete(`blacklist_${user.id}`)
      message.channel.send(`Unblacklisted!`)
}

  } catch (err) {
      console.log('No Id');
      message.reply(`Bruh Did you really not give a id\? Come on man just give a ID`);
      client.channels.cache.get("820052885081423872").send(`Some Dumbass forgot a id here is a useless error lmao`)
  }}
}
  //Lol replit is nice but it sucks
   //ikr
  