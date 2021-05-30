module.exports = {
    name: 'tocket', //This is for the Name of the command
    aliases: "mm", // Lets people use the command different way IE ping becomes p
    cooldown: 0, // The cooldown for the command
    ownerOnly: false, // If the command can only be used by the Owner
    hidden: true, // If you want the command to be hidden
    notneeded: true,
    run: async (client, message, args, data) => {
    if (message.channel.name.includes('-ticket')) {
        const filter2 = m => m.author.id === message.author.id;
        const warning = await message.channel.send('<@' + message.author.id + '> are you sure you want to close this ticket? please type `confirm` to close the ticket or `cancel` to keep the ticket open.')

        let collected1 = await message.channel.createMessageCollector(filter2, {
            max: 1,
            time: 30000,
            errors: ['time'],
        })
        collected1.on('collect', m => {
            if (m.content.toLowerCase() === "confirm") {
                message.channel.send("**Closing ticket.**", null).then(setTimeout(() => {
                    message.channel.delete()
                    const Discord = require('discord.js') 
                    const channel = client.channels.cache.get('846410364353511455')
                    const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`A Ticket Has Been Closed`)
                    .setDescription(`User: <@!${message.author.id}>\n\n Has closed a Ticket: ${message.channel.name}`)
                    .setFooter(message.author.id)
                    .setTimestamp()
                    channel.send(embed)
                }, 5000))
            } else if (m.content.toLowerCase() === "cancel") {
                message.channel.send('Closing ticket. __**Canceled**__ Ticket staying open.');
            }
        });
        collected1.on('end', collected => {
            if (!collected) {
                message.channel.send(`ERROR: User failed to provide an answer. Ticket staying open.`);
            }
        });
    } else if (!message.channel.name.includes('-ticket')) {
        message.channel.send('ERROR: You can only use this command in ticket channels.')

    }
}}