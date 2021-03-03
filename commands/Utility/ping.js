/* eslint-disable no-undef */
require("../../ExtendedMessage");

module.exports = {
	name : "ping",
	description: "check BOT heartBeat",
	aliases : [],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	run: async(client, message, args) => {
		const dt = new Date(message.createdTimestamp);
		message.inlineReply(`🏓Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``).then(msg=>msg.delete({timeout:50000}));
	}
}