const mongoose = require('mongoose');

const ServerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String
});

module.exports = mongoose.model('Servers', ServerSchema, 'servers');