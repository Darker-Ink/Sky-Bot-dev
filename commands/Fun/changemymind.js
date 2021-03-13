const Canvacord = require("canvacord/src/Canvacord")
const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'changemymind',
    description: "Sends a Customized Change My Mind meme",
    usage: "?changemymind <text>",
    category: "Fun",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;

        let text = args.join(" ")

        let image =  await Canvacord.changemymind(text)

        let ChangeMyMind = new MessageAttachment(image, "cmm.png")

        message.channel.send(ChangeMyMind)
    }
}