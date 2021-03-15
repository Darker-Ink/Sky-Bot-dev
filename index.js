const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    client.channels.cache.get("820760422676168705").send(x.join(" "));
});
const Distube = require("distube");
const config = require('./config/config.json');
client.config = config;

const mongoose = require('mongoose');
const db = require('quick.db');
const fs = require("fs");
require("./ExtendedMessage");
const prefix = process.env.prefix;

client.distube = new Distube(client, {
  searchSongs: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji

//Command Handler
function getDirectories() {
  return fs.readdirSync("./commands").filter(function subFolders(file) {
    return fs.statSync("./commands/" + file).isDirectory();
  });
}
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
  const folderFiles = fs
    .readdirSync("./commands/" + folder)
    .filter((file) => file.endsWith(".js"));
  for (const file of folderFiles) {
    commandFiles.push([folder, file]);
  }
}
for (const file of commandFiles) {
  let command;
  if (Array.isArray(file)) {
    command = require(`./commands/${file[0]}/${file[1]}`);
  } else {
    command = require(`./commands/${file}`);
  }

  client.commands.set(command.name, command);
  console.log( `✅  Success! Loaded Command ${command.name} `);
}
//Ready Event
client.on('ready', () => {
  const mongo_url = process.env.mongo_url;
  console.log("Snow Music is online!");

  mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("Connected to Snow Music Database"));
  const welcome = require('./events&functions/welcome')
  welcome(client)
})

//Message Event
client.on('message', async message => {
  const statss = require('./status.json')
  const xp = require('./events&functions/xp')
  if (!message.guild) return;
  const prefix = process.env.prefix;
  xp(message)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  


  // if(!cmd) return;
  const cmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
  if (cmd) cmd.run(client, message, args);
  let customCommands = db.get(`guildConfigurations_${message.guild.id}.commands`)
  if (customCommands) {
    let customCommandsName = customCommands.find(x => x.name === command)
    if (customCommandsName) return message.channel.send(customCommandsName.response)
  }

  if (message.content.startsWith(`${prefix}check`)) {
    message.react("✅");
    message.channel.send('Prefix is working!')
    message.react("<:confusion:820066718642602014>");
  }

  //Setting Bot's Status
  const stats = statss[Math.floor(Math.random() * statss.length)];
  client.user.setActivity({
    type: 'WATCHING',
    name: `danik abused this bot and is not a dev now`
  })
})



const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (message, queue, song) => {
    const playSongEmbed = new Discord.MessageEmbed()
      .setTitle('Started Playing')
      .setDescription(`[${song.name}](${song.url})`)
      .addField('**Views:**', song.views)
      .addField('**Duration:**', song.formattedDuration)
      .addField('**Status**', status(queue))
      .setThumbnail(song.thumbnail)
      .setColor("BLUE")
    message.channel.send(playSongEmbed)
  })
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on("playList", (message, queue, playlist, song) =>
    message.channel.send(
      `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items
      } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration
      }\`\n${status(queue)}`
    )
  )
  .on("addList", (message, queue, playlist) =>
    message.channel.send(
      `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items
      } songs) to queue\n${status(queue)}`
    )
  )
  .on("error", (message, err) =>
    message.channel.send(
      `${client.emotes.error} | An error encountered: ${err}`
    )
  );

client.login(process.env.token);

client.on("message", async message => {
  try {
  const member = message.author.username
  let afk = new db.table("AFKs")
  const authorStatus = await afk.get(`${message.author.id}_${message.guild.id}`)
   const mentioned = message.mentions.members.first()

  if (mentioned) {
    const status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);
    
   if (status) {
      const embed1 = new Discord.MessageEmbed()
      .setColor("GREEN")
     .setDescription(`${mentioned.user.tag} is \nMESSAGE: ${status}`)

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
} catch (error) {
      console.log(' ')
}})

client.on('message', async message => {
    if (message.channel.type === 'dm'){ 
        console.log(message.author.tag  + ' ' + message.content);
}})

//client.on("message", msg => {
//    if (msg.author.bot) return;
//    if (msg.content === "\<\:dumb\:820084401370562571\>") {
//        msg.inlineReply(`You Meanie`);
//    }
//});

// Init discord giveaways