const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const config = require('../config/config.json')
const joinlog = new Discord.WebhookClient(config.joinlogid, config.joinlogtoken);
module.exports = {
    type: 'guildCreate',
    run: async (guild) => {
        
    }}