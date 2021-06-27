const colors = require('colors');
const date = require('date-and-time');
const db = require('quick.db')
const dbtime = new db.table("TIMEs");
setInterval(() => {
var now = new Date();
let tom = date.format(now, 'hh:mm A')
dbtime.set(`redsky_`, tom)
}, 200)
global.Discord = require("discord.js");
global.discord = require('discord.js');
const Util = require("discord.js")
require("dotenv").config();
fetch = require("node-fetch");
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
})
const Distube = require("distube");
const SpotifyPlugin = require("@distube/spotify")
global.config = require('./config/config.json');
client.config = config;
const event_handler = require('./event');
const Guild = require('./schema.js')
const mongoose = require('mongoose');
const suggestionModel = require('./models/suggestion');
const fs = require("fs");
let time;

//Client stuff



client.distube = new Distube.default(client, {
    searchSongs: 1,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin()],
    leaveOnFinish: false,
    leaveOnStop: true,
    //leaveOnEmpty: true,
    nsfw: true,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji
client.cooldowns = new Discord.Collection();
client.data = require("./models/mongo/MongoDB.js");
client.tools = require("./tools/Tools.js");
client.color = require('./colors.js');
client.react = new Map()

// Global stuff
global.MessageEmbed = require('discord.js')
global.Embed = new Discord.MessageEmbed()
global.errorHook = new Discord.WebhookClient(client.config.errorhookid, client.config.errorhooktoken);
global.errorhook = new Discord.WebhookClient(client.config.errorhookid, client.config.errorhooktoken);

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
        time = (colors.red(dbtime.fetch(`redsky_`)))
    client.commands.set(command.name, command);
    console.log(colors.green(`[${time}] Command Loaded: ${command.name}`));
}
const chalk = require('chalk')
//Event Handler
event_handler.performEvents(client);
const eventsfolder = './events/';

fs.readdir(eventsfolder, (err, files) => {
    files.forEach(file => {
        const events = file
            .replace('.js', " ")
        console.log(chalk.magenta(`[${time}] [EVENTS] `) + chalk.green(events));
    });
});
/*
client.on('messageDelete', message => {
    let obj = JSON.parse(String(fs.readFileSync('./snipe.json')))

    obj[message.guild.id] = JSON.parse(JSON.stringify(message))
    fs.writeFileSync('./snipe.json', JSON.stringify(obj))
})
*/
client.on('ready', () => {
    const mongo_url = process.env.mongo_url;
    console.log(colors.green((`[${time}] ${client.user.username} is online!`)));

    mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log(colors.green((`[${time}] Connected to ${client.user.username}\'s Database`))));
})

client.login(process.env.token);
const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
    .on("playSong", (queue, song) => {
        const playSongEmbed = new Discord.MessageEmbed()
            .setTitle('Started Playing')
            .setDescription(`[${song.name}](${song.url})`)
            .addField('**Views:**', parseFloat(song.views).toLocaleString('en'))
            .addField('**Duration:**', song.formattedDuration)
            .addField('**Status:**', status(queue))
            .addField('**Requested By:**', `${song.user}`)
            .setThumbnail(song.thumbnail)
            //.setDescription(` [${queue.name}](${queue.url})`)
            .setColor("BLUE")
        queue.textChannel.send({
            embeds: [playSongEmbed]
        })
    })
    //▶️⏸️⏹️🔁🔉🔊
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
    )
    .on("searchNoResult", (message, query) =>
        message.channel.send(`No result found for ${query}!`))
    .on("playList", (message, queue, playlist, song) =>
        message.channel.send(
            `Play \`${queue.name}\` playlist (${queue.songs.length} songs).\nRequested by: ${playlist.user}\nNow playing \`${playlist.name}\` - \`${playlist.formattedDuration}\`\n${status(queue)}`
        ))
    .on("addList", (queue, playlist) => {
        queue.textChannel.stopTyping(true)
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emotes.success} Added Playlist`)
            .setColor("GREEN")
            .addField("PlayList Name", `\`${Util.escapeMarkdown(playlist.name)}\``)
            .addField("Amount Of Songs:", `${playlist.songs.length} Songs.`)
            .addField("Status", `${status(queue)}`)
            .setTimestamp()
        queue.textChannel.send({
            embeds: [embed]
        })
    })

    .on("disconnect", queue => {
        queue.textChannel.send(`I've been disconnected Stoping queue`)
    })
    .on("error", (channel, error) => channel.send(
        "An error encountered: " + error
    ))
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("searchResult", (message, result) => {
        let i = 0
        const searchembed = new Discord.MessageEmbed()
            .setTitle('Choose an option from below')
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
            .setColor("YELLOW")
            .setFooter('*Enter anything else or wait 60 seconds to cancel*')
        message.channel.send({
            embeds: [searchembed]
        }).then(m => client.setTimeout(() => {
            if (!m.deleted) m.delete()
        }, 61000))
    })
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`));


client.on("guildCreate", async (guild) => {
    const config = require('./config/config.json')
    const joinlog = new Discord.WebhookClient(config.joinlogid, config.joinlogtoken);
    const god = guild.id;
    const godname = guild.name;
    await joinlog.edit({
        name: `${guild.name}`,
        avatar: `${guild.iconURL()}`,
    })
    global.settings = await Guild.findOne({
        guildID: guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: `${god}`,
                guildName: `${godname}`,
                prefix: '!'
            })

            newGuild.save()
                //sends a msg to the channel saying someone has been added to the database
                .then(result => joinlog.send(`<@379781622704111626> Someone Has been Added to the Database. \n\n \`\`\`${result}\`\`\``))
                .catch(err => console.error(err));

            //used to stop a error
            return console.log('I wasn\'t here')
        }
    });
    console.log(guild.id)
    console.log(guild.name)
})
/*
client.on("guildCreate", guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const DarkerInk = client.users.cache.find(u => u.id === '379781622704111626').tag
    const M4X4 = client.users.cache.find(u => u.id === '424418136515936276').tag
    const linklel = client.users.cache.find(u => u.id === '206481777987026944').tag
    const Discord = require('discord.js');
    const welcomeembed = new Discord.MessageEmbed()

        .setColor('#0099ff')
        .setTitle('Bot Info')
        .setAuthor('Thank you for Inviting me!')
        .setDescription('I\'m Blue Sky, a Multi Purpose Discord bot made In discord.js, I used to be Known as Snow Music or Snow Bot, I changed My name due to.... Issues! There will be some Info below so you can understand how I work!')
        .addFields({
            name: 'Features',
            value: 'We have changeable prefix, a variety of commands, and more. The default prefix is \`\`?\`\` But it is always changeable like I said at the beginning It can be whatever you want, We have awesome devs and a great [support server](https://discord.gg/H3UNnxZSZ6) And will help you with whatever you need help with! To get started Using the Bot do \`\`?help\`\`'
        }, {
            name: '\u200B',
            value: '\u200B'
        }, {
            name: 'Main Dev',
            value: `${DarkerInk}`,
            inline: true
        }, {
            name: 'Dev',
            value: `${linklel}`,
            inline: true
        }, )
        .addField('Main Support Assistant', `${M4X4}`, true)
        .setTimestamp()
        .setFooter('Thx for inviting me', 'https://images-ext-1.discordapp.net/external/ge5a4I80_V8Kuau7AvqwWRaVnRbwlt4YlpT2HGu-F1Y/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/801908661470494751/ffd9ba48a16bab0cbe3d763b37a8a08e.webp?width=377&height=377');

    channel.send(welcomeembed);
});
*/
client.on("guildDelete", guild => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if (err) console.error(err)
    });
})
/*
const { inspect } = require("util")
process.on('unhandledRejection', (reason, promise) => {
    errorHook.send(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``, { split: true })
})
process.on('uncaughtException', (err, origin) => {
    errorHook.send(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`, { split: true })
})
process.on('warning', (warn) => {
    errorHook.send(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn}\n\`\`\``, { split: true })
})

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
*/

client.on("messageUpdate", async (oldMessage, message) => {
    try {
        if (message.author.bot) return
        let guild = oldMessage.guild
        let guildData = await client.data.getMsgDB(guild.id);
        if (!guildData.addons.log.enabled) return;

        let logChannel = await client.tools.resolveChannel(guildData.addons.log.channel, guild);
        if (!logChannel) return;
        const log = new Discord.MessageEmbed()
            .setAuthor(`${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({
                dynamic: true
            }))
            .setTitle(`Message Edited in #${oldMessage.channel.name}`)
            .setDescription(`**Before:** ${oldMessage.content}\n**After:** ${message.content}`)
            .addField(`Message Link`, `[click here](${oldMessage.url})`)
            .setFooter(`ID: ${oldMessage.author.id}`)
            .setTimestamp()
            .setColor("YELLOW")
        logChannel.send(log)

    } catch (e) {
        console.log(e);
    }

});