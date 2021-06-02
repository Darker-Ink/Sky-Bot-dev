module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(!message.channel.id == '849427878914424852') {
            return message.channel.send('oh my god you did it pog')
        }
    }}