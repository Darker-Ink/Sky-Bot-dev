const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const db = require('quick.db');
const fs = require("fs");
const colors = require('colors');
const debug = '[DEBUG] Message.js Is working!'.blue;
const config = require('../config/config.json')
const blacklist = require('../models/blacklist')

module.exports = {
    type: 'message',
    run: async (client, message) => {
            try {
        //console.log(`${debug}`)


  if (message.channel.type === "text" && !message.guild.me.hasPermission("SEND_MESSAGES")) return;
  // If the message is a dm doesn't reply used to stop errors with afk
  
if(message.channel.type == "dm") return;
//getting the afk info
  const member = message.author.username
  let afk = new db.table("AFKs")
  const authorStatus = await afk.get(`${message.author.id}_${message.guild.id}`)
  
   const mentioned = message.mentions.members.first()

  if (mentioned) {
      
    
    const status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);
    
   if (status) {
      const embed1 = new Discord.MessageEmbed()
      .setTitle(`HEY Leave ${mentioned.user.tag} Alone they are afk`)
      .setColor("GREEN")
     .setDescription(`${mentioned.user.tag} is AFK \n ${status}`)

      message.channel.send(embed1).then(i => i.delete({timeout: 900000}));
      
   
    }

  }
        if (authorStatus) {
   afk.delete(`${message.author.id}_${message.guild.id}`)
    const embed2 = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`Welcome Back ${message.author.tag}, you are no longer AFK`)

    message.channel.send(embed2).then(i => i.delete({timeout: 10000}));
    message.member.setNickname(` `)
 }

        
    
            //db stuff
    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: process.env.PREFIX
            })

            newGuild.save()
            //sends a msg to the channel saying someone has been added to the database
            .then(result => client.channels.cache.get("821201417254469692").send(`Someone Has Been Added to the DataBase \n\n \`\`\`${result}\`\`\``))
            .catch(err => console.error(err));
			
			//used to stop a error
            return console.log('I wasn\'t here')
        }
    });
	
	const prefix = settings.prefix;    
    if (!message.guild) return;
        if (message.channel.name == "chatbot") return;
//if someone pings the bot says the prefix in the server
    if(message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
        return message.channel.send(`You need the prefix? Well thats Fine its \`\`${settings.prefix}\`\``);
    };
			//logging commands used
            if (message.content.startsWith(settings.prefix)){
			const ddcmdused = new Discord.MessageEmbed()
            .setTitle("Command Used In " + message.guild.name)
	ddcmdused.addField(`\n${message.author.tag}`, `${message.author.id}`);

  ddcmdused.setDescription(`\n**PREFIX:**\n${settings.prefix}\n\n**COMMAND:**\n${message.content}\n\n`)

  ddcmdused.setTimestamp()  
  ddcmdused.setColor('RANDOM')
client.channels.cache.get("820052885081423872").send(ddcmdused)
            }

    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) message.member = await message.guild.fetchMember (message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
	if (cmd.name = null) return; 
	
            try {
    if (!command) command = client.commands.find((command) => command.aliases && command.aliases.includes(cmd));
                
  //  if (!command) return;
        
            if(command.ownerOnly && !config.owners.includes(message.author.id)) {
        return message.reply('You are Not a Owner, If you think this is a Mistake Please Contact Support');
    }
        
        if(command.disabled && !config.owners.includes(message.author.id)) {
        return message.reply('This Command Is disabled Due to a Bug Or It is still in development Please Check back later!');
    }
        if(!message.member.permissions.has(command.perms)) {
                //message.channel.send(command.noperms.replace("{permission}", command.perms))
            message.channel.send(`You do Not have the right perms to use this command You need ${command.perms} To use this command!`, command.perms)
                return;
            }
            
            const { cooldowns } = client;
			
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            
                }catch (err) {
                console.log(' ')
            }
    if (command)
        
       
        blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            

        command.run(client, message, args);
		    //when command ran:
            
    } else {
            message.channel.send('Hey You got blacklisted, You are Not allowed to run commands now, If you think this is a mistake Please Contact support, Now a few reasons for being Blacklisted Is because, A\) Spammed Commands B\) Is a Owner of a Bot server \(Meaning you have over 100 bots in the server\) Or C\) You are danik')
}})}catch (err) {
                console.log(' ')
        }}}