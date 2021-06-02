const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const config = require('../config/config.json')

module.exports = {
    type: 'guildCreate',
    run: async (client, guild) => {
        global.settings = await Guild.findOne({
            guildID: guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: guild.id,
                    guildName: guild.name,
                    prefix: '!'
                })

                newGuild.save()
                    //sends a msg to the channel saying someone has been added to the database
                    .then(result => client.channels.cache.get("827719237116231702").send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                    .catch(err => console.error(err));

                //used to stop a error
                return console.log('I wasn\'t here')
            }
        });
    }}