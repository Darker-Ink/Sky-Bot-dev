const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    usage: '',
    description: "",
    category: "Tickets",
    perms: [""],
    //botperms: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const reason = message.content.split(' ').slice(1).join(' ');
        let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");
        if (message.guild.me.permissions.has('MANAGE_CHANNELS') && !SupportCategory) {
            SupportCategory = await message.guild.channels.create('Tickets', {
                type: 'category',
            });
        };
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS') && !SupportCategory) {
            message.channel.send("I do not have permissions for this command.")
        }
        if (!message.guild.roles.cache.find(role => role.name === "ticket support")) {
            await (message.guild.roles.create({
                data: {
                    name: 'ticket support',
                    color: 'RANDOM',
                },
                reason: 'Add This to anyone you want to be able to see tickets',
            }));
        };
        let supportrole = message.guild.roles.cache.find(role => role.name === "ticket support")
        if (!supportrole) {
            return message.channel.send("Error: Cannot find the correct role.");
        }
        if (!reason) {
            return message.channel.send("Please specify a ticket subject \n \`(ex: -ticket {subject})\`");
        }
        const channelName = `ticket-${message.author.username}-${message.author.discriminator}`
        if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`)) {
            return message.channel.send("You already have a ticket open.")
        }
        message.guild.channels.create(channelName, {
            parent: SupportCategory.id,
            topic: `Ticket Owner: ${message.author.id}`
        }).then(c => {
            const sr = message.guild.roles.cache.find(role => role.name === "ticket support")
            const everyone = message.guild.roles.cache.get(message.guild.id)
            c.updateOverwrite(sr, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: true,
            });
            c.updateOverwrite(everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            });
            c.updateOverwrite(message.author, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: true,
            });
            let CreatedTicketEmbed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("New Support Ticket")
                .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
                .setTimestamp()
                .setFooter("Use ?commands for my list of commands")
            message.channel.send(CreatedTicketEmbed)
            let GreetEmbed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .addField("New Support Ticket", `<@${message.author.id}> Thanks for making a ticket, someone will be with you shortly.`)
                .addField(`Issue: `, reason)
                .setTimestamp()
                .setFooter("Use ?commands for my list of commands")
            c.send(GreetEmbed)
        }).catch(console.error);
    }
}