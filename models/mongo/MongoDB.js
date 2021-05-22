const Discord = require("discord.js");
const config = require("../../config/config.json");
const usersDB = require("../User.js");
const guildsDB = require("../Guild.js");
const logsDB = require("../Log.js");
const msglog = require("../msglog.js")

//Create/find users Database
module.exports.getUserDB = async function(userID){

  let userDB = await usersDB.findOne({ id: userID });
  if(userDB){
    return userDB;
  } else {
    userDB = new usersDB({
      id: userID
    })
    await userDB.save().catch(err => console.log(err));
    return userDB;
  }
};

//Create/find Guilds Database
module.exports.getGuildDB = async function (guildID){

  let guildDB = await guildsDB.findOne( { id: guildID } );

  if(guildDB){
    return guildDB;
  } else {
    guildDB = new guildsDB({
      id: guildID
    })
    await guildDB.save().catch(err => console.log(err));
    return guildDB;
  }
};
module.exports.getMsgDB = async function (guildID, guildNamee){
let msglogs = await msglog.findOne( { id: guildID } );
    
  if(msglogs){
    return msglogs;
  } else {
    msglogs = new msglog({
      id: guildID
    })
    await msglogs.save().catch(err => console.log(err));
    return msglogs;
  }
};

//Create/find Members Database
module.exports.getMemberDB = async function (userID, guildID){

  let memberDB = await membersDB.findOne( { id: userID, guildID: guildID } );
  if(memberDB){
    return memberDB;
  } else {
    memberDB = new membersDB({
       id: userID,
       guildID: guildID
    })
    await memberDB.save().catch(err => console.log(err));
    return memberDB;
  }
};

//Create/find Log in Database
module.exports.getLogDB = async function (user, guild, cmd){

let logDB = new logsDB({
      commandName: cmd.name,
      author: { username: user.username, discriminator: user.discriminator, id: user.id },
      guild: { name: guild ? guild.name : "dm", id: guild ? guild.id : "dm" }
    })
    await logDB.save().catch(err => console.log(err));
    return;

};