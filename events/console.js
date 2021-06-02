module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(config.console.includes(message.channel.id)){
            return message.channel.send('oh my god you did it pog')
        }
    }}