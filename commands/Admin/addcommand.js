const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'addcommand',
    description: "Add a Custom Command to your server!",
    usage: "?addcommand <Command Name> <Command Response>",
    aliases: ['addcmd'],
    category: "Admin",
    run: async(client, message, args) => {
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;

         if(!message.member.hasPermission('ADMINISTRATOR')) {
            const banerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Add Commands")
            .setColor('#34ebe5')

            return message.channel.send(banerror)
        }
        if(!args[0]) return message.channel.send(`You Need to provide a Command Name! \n\
\`addcommand <Command Name> <Command Response>\``)
        let commandName = args[0].toLowerCase()
        
        if(commandName.length > 15) return message.channel.send(`Command Name can only have less than/equal to 15 letters!`)

        let commandResponse = args.slice(1).join(" ")
        if(!commandResponse) return message.channel.send(`You need to provide command response i.e. the text you will receive after \
executing this command! \n \`addcommand <Command Name> <Command Response>\``)

        let database = db.get(`guildConfigurations_${message.guild.id}.commands`)
        if(database && database.find(x => x.name === commandName.toLowerCase())) {
            return message.channel.send(`This command name is already added in this server's custom commands!`)
        }

        let data = {
            name: commandName,
            response: commandResponse
        }

        db.push(`guildConfigurations_${message.guild.id}.commands`, data)
        const embed = new MessageEmbed()
        .setTitle(`Command Added`)
        .setDescription('Added **' + commandName.toLowerCase() + '** as a custom command in this server!')
        .setColor('BLUE')

        message.channel.send(embed)

    }
}