const {
    MessageEmbed
} = require('discord.js');
const colors = require('colors');

module.exports = {
    name: "consolelog",
    description: "", 
    ownerOnly: true,
    usage: "",
    aliases: ["cl"],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        try {
            const messagelog = args.slice(0).join(" ")
	console.log(`${messagelog}`)
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')    
        }
    }
};
