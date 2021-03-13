/* eslint-disable no-undef */
require("../../ExtendedMessage");

module.exports = {
	name : "ping",
	description: "check BOT heartBeat",
	aliases : [],
  category: "Utility",
	run: async(client, message, args) => {
    const db = require('quick.db')
let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;
		const dt = new Date(message.createdTimestamp);
		message.inlineReply(`🏓Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``).then(msg=>msg.delete({timeout:50000}));
	}
}