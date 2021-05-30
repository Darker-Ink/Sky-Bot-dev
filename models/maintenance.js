const mongoose = require('mongoose');

const MaintenanceMode = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ino: String,
    reason: String,
    enabled: String
});

module.exports = mongoose.model('Maintenance', MaintenanceMode, 'maintenance');