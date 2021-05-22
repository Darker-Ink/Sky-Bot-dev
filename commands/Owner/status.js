const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
const colors = require('colors');

module.exports = {
    name: "status",
    description: "Change the status",
    ownerOnly: true,
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const stringOne = `[WARN] ${message.author.tag} Changed The Status`.red;
        console.log(stringOne)
        const stats = args[0]
        const dark = args.slice(1).join(" ")
        //const yes = args[1]
        const statss = (`${stats}`)
        const content = (`${dark}`)
        //const darkurl = (`${yes}`)
        client.user.setPresence({
            activity: {
                name: content,
                type: stats,
                //url: darkurl,
            }
        })
        const embed = new Discord.MessageEmbed()
            .setTitle("My Status Has been changed")
            .addField("Status Type", `${stats}`)
            .addField("Status Message", `${dark}`)
            //.addField("steam URL", `${yes}` || "No URL")
            .setColor("#420420")
        message.channel.send(embed)
    }
}