const process = require('child_process');
const config = require('../config/config.json')
const console = new Discord.WebhookClient(config.consoleID, config.consoleTOKEN);
module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(!config.owners.includes(message.author.id)) {
            return
        }
        if(message.content.startsWith('>')) return
        if(config.console.includes(message.channel.id)){
            process.exec(`${message.content}`, (error, stdout) => {
                let result = (stdout || error);
                console.send(`\`\`\`\n${result}\n\`\`\``, { split: true })
            })
        }
    }}