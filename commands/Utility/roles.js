const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "roles",
    description: "Get the servers roles if it has too many",
    aliases: ['rls'],
    usage: "",
    category: "Utility",
    run: async (client, message, args) => {
        try {

            // const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const members = message.guild.members.cache;
            const channels = message.guild.channels.cache;
            const emojis = message.guild.emojis.cache;
            let rolemap = message.guild.roles.cache


            //var roles = ''
            var rc = 0
            const roles = message.guild.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r).join(", ") || 'none';

            //message.guild.roles.cache.array().forEach((i) => {roles += `<@&${i.id}>.join(", ") `; rc++}) The old mapping system is this but it wasn't mine it was someones name daniks and see I don't want to ""steal"" his code so I made my own anyways his kind of sucks :)
            for (let i = 0; i < roles.length; i += 2000) {
                const toSend = roles.substring(i, Math.min(roles.length, i + 2000));
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Roles`)
                    .setDescription(`${toSend}, @everyone`)
                message.channel.send({ embeds: [embed] })
            }
        } catch (error) {
            message.reply(errorMessage)
            errorhook.send('```\n' + error.stack + '\n```')
        }
    }
}