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
            console.log('fuck a error');
            message.reply(`There was an error during evaluation, \n\n**${err}**`);
            client.channels.cache.get("827716948087013406").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
};
