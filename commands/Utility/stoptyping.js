const db = require('quick.db')
const Discord  = require('discord.js')

module.exports = {
    name: 'stoptyping',
    description: "Is the bot typing and you can\'t stop it? Use this command to stop it",
    usage: "?stoptyping",
    aliases: ['styp'],
    category: "Utility",
    run: async(client, message, args) => {
let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;
        message.channel.stopTyping();
    }}