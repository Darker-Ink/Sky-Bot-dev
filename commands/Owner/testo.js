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
      const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1])
      if (!amount) return message.channel.send("You need to give an amount");
      if (amount <= 1) return message.channel.send("Can only delete a min of 2 messages")
      if (amount >= 101) return message.channel.send("Can only delete a max of 100 messages")
      if(user) {
        return message.channel.messages.fetch({
          limit: `${amount}`
      }).then((messages) => { 
          const botMessages = [];
          messages.filter(m => m.author.id === `${user.id}`).forEach(msg => botMessages.push(msg))
        message.channel.bulkDelete(botMessages).then(() => {
         message.channel.send(`Cleared \`${amount}\` Messages from \`${user.username}\``).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 61000))
          });
      })
      }
      await message.channel.bulkDelete(amount, true).then(() => {
        message.channel.send(`Cleared \`${amount}\` Messages from \`${message.channel.name}\``).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 61000))
         });
    }}
