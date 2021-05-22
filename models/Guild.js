const mongoose = require("mongoose"),
config = require("../config/config.json");

module.exports = mongoose.model("Guild", new mongoose.Schema({

  id: { type: String }, //ID of the guild
  registeredAt: { type: Number, default: Date.now() },

  addons: { type: Object, default: { 
    welcome: {
      enabled: false, 
      channel:  null, 
      message: null, 
      image: false, 
      embed: false 
    },
    goodbye: {
      enabled: false, 
      channel:  null, 
      message: null, 
      image: false, 
      embed: false 
    }
  }}

}));