const mongoose = require("mongoose"),
config = require("../config/config.json");

module.exports = mongoose.model("MaintenanceMode", new mongoose.Schema({
  addons: { type: Object, default: { 
    maintenance: {
      enabled: false, 
      author:  null,
      reason:  null,
      dateandtime: null,
    }
  }}

}));