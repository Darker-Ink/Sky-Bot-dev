const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
    name: 'changemymind',
    description: "Sends a Customized Change My Mind meme",
    aliases: ['cmm'],
    usage: "?changemymind <text>",
    category: "Fun",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;

        const Value = args.join(" ");
    if (!Value || Value.length > 50) return message.channel.send("Please Give  Text And Make Sure Its Not 50+ Characters Long!"); 

    const Data = await Random.ChangeMyMind({ Message: Value, Color: Color });

    return message.channel.send(Data);
  }
};