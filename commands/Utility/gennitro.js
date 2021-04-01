const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "gennitro",
   description: "Get a Nitro Gift from the owner <3",
    usage: "GenNitro",
    aliases: ["gen"],
    category: "Utility",
  run: async (client, message, args) => {
      let msg = await message.channel.send({
  embed: {
    "description": "Connecting to Discord Database\n Connected!\n Generating Nitro....",
    "color": "GREEN"
  }
})      .then((msg)=> {
  setTimeout(function(){
    
      

      let embed = new discord.MessageEmbed()
       .setTitle("Nitro Made")
      .setColor("GREEN")
      .setThumbnail(`https://media.tenor.co/videos/3432b2ad2ad3916d57ff23766d756e72/mp4`)
      .setDescription("Click The Nitro Button to Claim your Nitro! [Nitro](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
      return msg.edit(embed)
      }, 8000)
      })}}
