const process = require('child_process');
module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(config.console.includes(message.channel.id)){
            process.exec(args.join(" "), (error, stdout) => {
                let result = (stdout || error);
                message.channel.send(result, {
                    code: "asciidoc",
                    split: "\n"
                })
            })
        }
    }}