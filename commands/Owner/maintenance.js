const Maintenance = require('../../models/maintenance.js')
const mongoose = require('mongoose');

module.exports = {
    name: 'maintenance', //This is for the Name of the command
    usage: "maintenance <enable/disable> <reason>", //This lets the user Know how to use the command
    description: 'This is to Put the bot into or out of maintenance mode', //Gives a easy description
    category: "Owner", // What category the command should be in
    aliases: "mm", // Lets people use the command different way IE ping becomes p
    cooldown: 0, // The cooldown for the command
    ownerOnly: false, // If the command can only be used by the Owner
    hidden: true, // If you want the command to be hidden
    disabledbug: false, // If the command has been has been disabled due to a bug
    disabled: false, // If the command is still being Made
    perms: [], // The perms the user needs
    botperms: [], // The perms the bot needs
    darkinkonly: true, // If its only for DarkerInk
    notneeded: true,
    run: async (client, message, args, data) => {
      
      const settingsss = await Maintenance.findOne({
            ino: message.author.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newMaintenance = new Maintenance({
                    _id: mongoose.Types.ObjectId(),
                    ino: message.author.id,
                    reason: '',
                    enabled: false
                })

                newMaintenance.save()
                    //sends a msg to the channel saying someone has been added to the database
                    .then(result => client.channels.cache.get("827719237116231702").send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                    .catch(err => console.error(err));

                //used to stop a error
                return console.log('')
            }
        });
        let reason2 = args.slice(1).join(" ")
        if (!args[0]) {
            return message.channel.send('Please enable or disable maintenance mode')
        }
        if(args[0] == "enable") {
            if (!reason2) {
                return message.channel.send('You need to add a reason')
            }
            await settingsss.updateOne({
                reason: reason2,
                enabled: true
            })
            return message.channel.send('You enabled maintenance Mode because of \`' + reason2 + '\`')
            
        } else if(args[0] == "disable") {
            await settingsss.updateOne({
                reason: '',
                enabled: false
            })
            return message.channel.send('You disabled maintenance Mode')
        } else {
            return message.channel.send('Well I can\'t null maintenance mode so enable it or disable it')
        }
}}
