const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const config = require('../config/config.json')
const joinlog = new Discord.WebhookClient(config.joinlogid, config.joinlogtoken);
module.exports = {
    type: 'guildCreate',
    run: async (guild) => {
   const god = guild.id;
   const godname = guild.name;
    global.settings = await Guild.findOne({
        guildID: guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: `${god}`,
                guildName: `${godname}`,
                prefix: '!'
            })
    
            newGuild.save()
                //sends a msg to the channel saying someone has been added to the database
                .then(result => joinlog.send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                .catch(err => console.error(err));
    
            //used to stop a error
            return console.log('I wasn\'t here')
        }
    });
    }}