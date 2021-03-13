const db = require('quick.db')
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'Rank',
    description: 'Check your or someone else\'s rank',
    usage: 'rank <@mention>',
    aliases: ['ranking'],
    category: "Utility",
    run: async(client, message, args) => {
      const db = require('quick.db')
let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;

        const member = message.mentions.users.first() || message.author;
        var level = db.get(`guild_${message.guild.id}_level_${member.id}`) || 0
        let xp = db.get(`guild_${message.guild.id}_xp_${member.id}`) || 0
        var xpNeeded = level * 500 + 500
        let every = db
            .all()
            .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
            .sort((a, b) => b.data - a.data)
        var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${member.id}`) + 1
        const image = new canvacord.Rank()
            .setUsername(member.username)
            .setDiscriminator(member.discriminator)
            .setStatus(member.presence.status)
            .setCurrentXP(xp)
            .setRequiredXP(xpNeeded)
            .setRank(rank)
            .setLevel(level)
            .setAvatar(member.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setRankColor('WHITE')
        image.build().then(data => {
            const img = new MessageAttachment(data, 'Rank.png')
            return message.channel.send(img)
        })
        

    }
}