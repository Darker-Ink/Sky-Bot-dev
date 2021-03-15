const { MessageEmbed } = require("discord.js");
const db = require('quick.db');;

module.exports = {
    name: 'leaderboard-broken',
    description: "Check Who's leading the charts in terms of IGBank Balance!",
    usage: "?leaderboard",
    aliases: ['level', 'levels'],
    category: "Economy",
    run: async(client, message, args) => {
      let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        let money = db.all().filter(lb => lb.ID.startsWith(`bank_${message.guild.id}`)).sort((a, b) => b.data- a.data)
        let bankBalance = money.slice(0, 10)
        console.log(bankBalance)
        let content = "";

        for(let i = 0; i < bankBalance.length; i++) {
            let user = client.users.cache.get(bankBalance[i].ID.split('_')[2])

            content += `${i+1}. ${user} - \$${bankBalance[i].data} \n`

        }

        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`${message.guild.name}\'s Leaderboard`)
        .setDescription(`${content}`)
        .setTimestamp()

        message.channel.send(embed)
    }
}