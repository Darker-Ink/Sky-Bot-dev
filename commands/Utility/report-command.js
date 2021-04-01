const Discord = require('discord.js');
module.exports = {
    name: 'report-command',
    usage: "report-command help <it says Darkerink is cool>",
    description: 'report broken commnads',
    disable: false,
    aliases: ['rc'],
    category: "Utility",
    cooldown: 90,
    run: async (client, message, args) => {
        const channel = client.channels.cache.get('824871188153106472')
        if (!args[0] > 0) {
            return message.channel.send('There is No command Called \`Blank\` Please provide a valid command')
        }
        const commandName = args[0].toLowerCase();

		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is No command Named \`${commandName}\`, ${message.author}!`);
		}
                let reportmsg = args.slice(1).join(" ")
        if (!reportmsg > 0) {
            return message.channel.send(`You can\'t just report the command without a reason, Please provide a reason ${message.author}!`)
        }
        
         const user = message.member;
        const embed = new Discord.MessageEmbed()
        .setTitle(`Command Report From ${message.author.username}`)
        .addField("Command Reported", `${args[0]}\n\n`, false)
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .addField("\nReason For Report", `${reportmsg}`, false)
        .setColor("#420420") //Nice
        .setFooter(`command reported from ${message.guild.name}`);

      channel.send(embed);
        message.channel.send('Command Reported The devs will check it out soon!')
    }}