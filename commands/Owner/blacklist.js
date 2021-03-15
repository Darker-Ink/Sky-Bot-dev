const Discord = require('discord.js');
const db =require("quick.db")
const config = require('../../config/config.json');
module.exports = {
    name: "blacklist",
    description: "To blacklist the abusers",
    usage: "bl",
    aliases: ["bl"],
    category: "Owner",
  run: async (client, message, args) => {
    try {

      let user = await client.users.fetch(args[0]);
    if(!user) return message.channel.send(`Invalid user or id `);
    let fetched = db.get(`blacklist_${user.id}`)
    
    if(!fetched) {
      db.set(`blacklist_${user.id}`, true)
    
    
      message.channel.send(`Blacklisted! ${user.tag}`);
    } else { 
      return message.channel.send(`This user is already blacklisted!`);
    }

} catch (err) {
      console.log(err);
      message.reply(`Bruh Did you really not give a id\? Come on man just give a ID`);
      client.channels.cache.get("820052885081423872").send(`Some Dumbass forgot a id here is a useless error lmao`)
  }}
}
