
module.exports = {
    name: 'setprefix',
    description: "sets the prefix",
    category: "Admin",
    run: async(client, message, args) => {
        const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        message.channel.send('I messed up the command is broken sorry')
    }}