const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const Distube = require("distube");
const config = require('./config/config.json');
client.config = config;
const event_handler = require('./event');
const Guild = require('./schema.js')
const mongoose = require('mongoose');
const fs = require("fs");
require("./ExtendedMessage");
const prefix = process.env.prefix;
const colors = require('colors');
const blacklist = require('./models/blacklist')
client.distube = new Distube(client, {
    searchSongs: true,
    leaveOnFinish: false,
    leaveOnStop: true,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji
client.cooldowns = new Discord.Collection();
client.data = require("./models/mongo/MongoDB.js");
client.tools = require("./tools/Tools.js");
client.color = require('./colors.js');
client.react = new Map()
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
    console.log(colors.green(`✅  Success! Loaded Command ${command.name} `));
}
//Ready Event
event_handler.performEvents(client);

client.on('messageDelete', message => {
    var obj = JSON.parse(String(fs.readFileSync('./snipe.json')))

    obj[message.guild.id] = JSON.parse(JSON.stringify(message))
    fs.writeFileSync('./snipe.json', JSON.stringify(obj))
})

client.on('ready', () => {
    const mongo_url = process.env.mongo_url;
    console.log(`${client.user.username} is online!`);

    mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log(`Connected to ${client.user.username}\'s Database`));
})

client.login(process.env.token);
client.on("error", () => {
    client.login(process.env.token)
});


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
            //▶️⏸️⏹️🔁🔉🔊
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
    )
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
    message.channel.send(searchembed).then(m => m.delete({
                        timeout: 61000
                    }));
    })
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`));

client.on('message', async message => {
    if (message.channel.type === 'dm') {
        console.log(message.author.tag + ' ' + message.content);
    }
})

client.on('message', async message => {
    var now = new Date();
    if (message.channel.id == "827629437502881883") {
        console.log(message.author.tag + ' ' + message.content);
    }
})

const {
    GiveawaysManager
} = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}  ${giveaway.messageURL}`);
});


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

client.on("guildDelete", guild => {
    const Logs = '827719260209152010'
    client.channels.cache.get(Logs).send(
        new Discord.MessageEmbed()
        .setTitle("I Was Removed From a Guild :c")
        .addField("Guild Name", `${guild.name}`)
        .addField("Guild Members", `${guild.members.cache.size}`)
        .addField("Guild Id", `${guild.id}`)
        .addField("Guild Owner", `<@${guild.ownerID}> | Id: ${guild.ownerID}`)
        .setFooter(`Blue Sky is Currently in ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setColor('RED')
    )
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if (err) console.error(err)
    });
})


client.on('message', async message => {
    try {
        if (config.ownertest.includes(message.guild.id)) {
            return
        }
        const dark = message.guild.id
        const guild = client.guilds.cache.get(`${dark}`)
        const memberCount = guild.members.cache.filter((member) => !member.user.bot).size;
        const botCount = guild.members.cache.filter((member) => member.user.bot).size;

        if (botCount > memberCount) {
            guild.leave().catch((err) => {
                console.log(`there was an error leaving the guild: \n ${err.message}`);
            });
        }

    } catch (err) {
        console.log(err)
    }
})

client.on("guildCreate", guild => {

	if (config.ownertest.includes(guild.id)) {
            return console.log('Joined a Bot guild that you allowed')
        }
    const memberCount = guild.members.cache.filter((member) => !member.user.bot).size;
    const botCount = guild.members.cache.filter((member) => member.user.bot).size;

    if (botCount > memberCount) {
        guild.leave().catch((err) => {
            console.log(`there was an error leaving the guild: \n ${err.message}`);
        });
    }
})

/*
const {
    inspect
} = require("util")
process.on('unhandledRejection', (reason, promise) => {
    client.channels.cache.get('827716948087013406').send(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``)
})
process.on('uncaughtException', (err, origin) => {
    client.channels.cache.get('827716948087013406').send(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`)
})
process.on('warning', (warn) => {
    client.channels.cache.get('827716948087013406').send(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``)
})

*/
fetch = require("node-fetch");



client.on("message", async message => {

    if (message.channel.name == "chatbot") {

        if (message.author.bot) return;
        if (message.content.includes(`Who Made you`)) {
            return message.inlineReply(`The Bot was Made By Darkerink But the Chat bot was made by a great person Called Nekoyasui#6804 \(check them out on github :\) \)`)
        };
        if (message.content.includes(`who made you`)) {
            return message.inlineReply(`The Bot was Made By Darkerink But the Chat bot was made by a great person Called Nekoyasui#6804 \(check them out on github :\) \)`)
        };
        if (message.content.includes(`how many servers are you in`)) {
            return message.inlineReply(`I am in ${client.guilds.cache.size} servers`)
        };
        message.channel.startTyping();
        if (message.author.bot) return;

        if (!message.author || !message.content || message.author.bot || message.author.id === client.user.id) return;
        if (!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return;

        const chat = {
            message: `${message.content}`,
            uid: message.author.id,
            bot: {
                name: "Blue Sky",
                birthdate: "12/31/1969",
                prefix: "?",
                gender: "Female",
                description: "I'm a Multipurpose Bot That loves to help you!"
            }
        };

        const getting = await fetch("https://api.nekoyasui.ga/post/chat", {
            method: "POST",
            body: JSON.stringify(chat),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).catch(() => {})

        //data
        console.log(getting)
        message.inlineReply(`${getting.data}`)
        message.channel.stopTyping();
    }
})

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    client.channels.cache.get("827629437502881883").send(x.join(" "));
    //client.users.cache.get("206481777987026944").send(x.join(" "));
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

client.on("guildCreate", async (guild) => {
    let owner = client.users.cache.get(guild.ownerID)
    const EmbedJoin = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Joined Guild: ${guild.name}!`)
        .setThumbnail(guild.iconURL())
        .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)
        .addField(`**SERVER OWNER**`, `\`\`\`${owner.tag}\`\`\``)
        .addField(`**OWNER ID**`, `\`\`\`${owner.id}\`\`\``)
        .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)
        .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)
        .setTimestamp()
    console.log(`Joined New Guild: ${guild.name}`);
    client.channels.cache.get(`827719260209152010`).send(EmbedJoin)
});
