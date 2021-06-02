const process = require('child_process');
module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(config.console.includes(message.channel.id)){
            process.exec(`${message.content}`, (error, stdout) => {
                let result = (stdout || error);
                message.channel.send(result, { split: true })
            })
        }
    }}