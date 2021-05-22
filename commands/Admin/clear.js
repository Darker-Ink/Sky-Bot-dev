const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'clear',
    description: "Clears The Mentioned Number of Messages",
    usage: "?clear 70",
    category: "Admin",
    aliases: ["c"],
    perms: ["MANAGE_MESSAGES"],
    botperms: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        try {
            if (!args[0]) {
                return message.channel.send("Please Enter An Amount Between 1 and 100")
            }

            let deleteAmount;

            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;

            } else {
                deleteAmount = parseInt(args[0]);
            }

            await message.channel.bulkDelete(deleteAmount, true);

            const embed = new MessageEmbed()
                .setDescription(`Successfully Deleted ${deleteAmount} Messages`)

                .setColor('#04E6FF')

            await message.channel.send(embed).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 5000))


        } catch (err) {
            message.reply(`Hey It seems like you got a error, This is not good Please Join https://discord.gg/jKeEgwrrbu and report it, Or if you don't want to join the server just do \n\`<prefix>report-command <command name> <bug>\``)
        }
    }
}