const Discord = require('discord.js');

module.exports = {
    name: 'testo', //This is for the Name of the command
    usage: "This is a example usage", //This lets the user Know how to use the command
    description: 'This is a example Description', //Gives a easy description
    category: "Example", // What category the command should be in
    aliases: "", // Lets people use the command different way IE ping becomes p
    cooldown: 0, // The cooldown for the command
    ownerOnly: true, // If the command can only be used by the Owner
    hidden: false, // If you want the command to be hidden
    disabledbug: false, // If the command has been has been disabled due to a bug
    disabled: false, // If the command is still being Made
    perms: [], // The perms the user needs
    botperms: [], // The perms the bot needs
    readbotrules: false, // This is **VERY** userful It is for commands I.E. Logging If it is turned on The user needs to read the rules and Accpet them, This is to save my ass for people who don't want to get logged I.E. messages and So discord can Verify me or maybe a Log bot I make
    run: async (client, message, args, data) => {
      const user = message.mentions.users.first()

      if(user) {
        //return message.channel.send(`you mentioned someone ${user.id}`)
        message.channel.messages.fetch({
          limit: args[1] // Change `100` to however many messages you want to fetch
      }).then((messages) => { 
          const botMessages = [];
          messages.filter(m => m.author.id === `${user.id}`).forEach(msg => botMessages.push(msg))
         return message.channel.bulkDelete(botMessages).then(() => {
              message.channel.send("Cleared bot messages").then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 61000))
          });
      })
      }
message.channel.send('you didn\'t mention someone')
    }}