const ms = require('ms')
const os = require('os')
module.exports = {
    name: "ping",
    description: "check the bots heartBeat",
    cooldown: 0,
    category: "Utility",
    run: async (client, message, args) => {
        let darkos = os.type()
        if(darkos === 'Linux') {
        darkos = 'Linux'
    } else if(darkos === 'Windows_NT'){ 
        darkos = 'Windows'
    } else darkos = 'Unknown OS'
        const m = await message.channel.send("Pinging...");
        return m.edit(`**API latency is:** \`${m.createdTimestamp - message.createdTimestamp}ms\` \n\n**WS latency is:** \`${Math.round(message.client.ws.ping)}ms\`\n\n**${darkos} Uptime is:** \`${ms(os.uptime() * 1000, { long: true })}\`.`);
    }}