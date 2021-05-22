const Discord = require('discord.js')
module.exports = {
    type: 'messageDelete',
    async run(client, message) {
        try {
            if(message.author.bot) return;
            let guild = message.guild
            let guildData = await client.data.getMsgDB(guild.id);
            if (!guildData.addons.log.enabled) return;

            let welcomeChannel = await client.tools.resolveChannel(guildData.addons.log.channel, guild);
            if (!welcomeChannel) return;

const logd = new Discord.MessageEmbed()
		.setTitle(`Message deleted By, ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
				//The channel Idea was suggested by Chimken#3511 <3
        .addField("Channel", `<#${message.channel.id}>`)
		.setDescription(`> ${message.content}`) 
		.setFooter(`ID: ${message.author.id}`)
		.setTimestamp()
		.setColor("RED")
            welcomeChannel.send(logd)

        } catch (e) {
            console.log(e);
        }

    }
};