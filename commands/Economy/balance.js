const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'balance',
    description: "Shows Your Virtual Balance in IG Bank",
    usage: "?balance <mention>\(for someone else's balance\) OR ?balance\(for your own balance\)",
    aliases: ['bal'],
    category: "Economy",
    run: async(client, message, args) => {

        let user  = message.mentions.users.first() || message.author

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
        let bankBalance = await db.fetch(`bank_${message.guild.id}_${user.id}`)

        if(bal === null) bal = 0;
        if(bankBalance === null) bankBalance = 0;

        const balEmbed = new MessageEmbed()
        .setTitle(`${user.username}\'s Balance`)
        .setColor("BLUE")
        .addField('🏦 Bank',`\n\$${bankBalance}\n\n💵 Wallet\n\$${bal}`)
        .addField('Bank Balance', `You Currently have \$${bankBalance} in your Bank Account`)

        message.channel.send(balEmbed)
    }
}