module.exports = {
    type: 'message',
    run: async (client, message) => {

const swearWords = ["darn", "shucks", "frak", "shite"];
if (swearWords.some(word => message.content.includes(word))) {
  message.delete()
}
    }
}