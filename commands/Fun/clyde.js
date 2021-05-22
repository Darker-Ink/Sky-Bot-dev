const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: 'clyde',
    description: "bonk",
    usage: '?bonk <mention>',
    category: "Fun",
    cooldown: 0,
    run: async (client, message, args) => {
        let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> **Please type the text to clyde!**`
		)
		.setColor("RED");
	let mindtxt = args.slice(0).join(" ");
	if (!mindtxt)
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 10000 }));

	let image = await canvacord.Canvas.clyde(mindtxt);

	let triggered = new Discord.MessageAttachment(image, "clyde.png");

	message.channel.send(triggered);
    }}