require("../../ExtendedMessage");
const Discord = require('discord.js')
module.exports = {
    name : "ping",
    description: "check the bots heartBeat",
    cooldown: 0,
  category: "Utility",
    run: async(client, message, args) => {
    const db = require('quick.db')
let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;
        const dt = new Date(message.createdTimestamp);
        const responses = [
    'I-It\'s not like I wanted to say pong or anything...',
    'Pong...',
    'Woo! A secret command!',
    'Ping! ...I mean **pong!**',
    'Does anyone even use this?',
    'At your service!',
    'Testing, testing, 1, 2, 3!'
  ];
 const dresponses = responses[Math.floor(Math.random() * responses.length)];
  
        let msg = await message.channel.send({
  embed: {
    "description": "Pinging.......",
    "color": "RANDOM"
  }
})      .then((msg)=> {
  setTimeout(function(){
      
        const embed = new Discord.MessageEmbed()
        .setTitle("PING")
        .addField("API", `\`${new Date() - dt}ms\``, true)
        .addField("WS", `\`${client.ws.ping}ms\``, true)
        .setFooter(`${dresponses}`)
        .setColor("RANDOM")
        return msg.edit(embed)
      }, 0)
            console.log(`"API" ${new Date() - dt}ms "WS" ${client.ws.ping}ms`)
})}}