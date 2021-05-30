const mongoose = require("mongoose"),
config = require("../config/config.json");

module.exports = mongoose.model("Msg", new mongoose.Schema({

  id: { type: String }, //ID of the guild
  registeredAt: { type: Number, default: Date.now() },

  addons: { type: Object, default: { 
    log: {
      enabled: false, 
      channel:  null,
      webhookid:  null,
      webhooktoken: null,
    }
  }}

}));