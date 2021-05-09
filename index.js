const Discord = require("discord.js");
require("dotenv").config();
fetch = require("node-fetch");
const client = new Discord.Client({
     allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
   // intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_BANS"]
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
})
const Distube = require("distube");
const SpotifyPlugin = require("@distube/spotify")
const config = require('./config/config.json');
client.config = config;
const event_handler = require('./event');
const Guild = require('./schema.js')
const mongoose = require('mongoose');
const fs = require("fs");
const prefix = process.env.prefix;
const colors = require('colors');
const mongoCurrency = require('discord-mongo-currency');
client.distube = new Distube(client, {
    searchSongs: 15,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin()],
    leaveOnFinish: false,
    leaveOnStop: true,
    leaveOnEmpty: true,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji
client.cooldowns = new Discord.Collection();
client.data = require("./models/mongo/MongoDB.js");
client.tools = require("./tools/Tools.js");
client.color = require('./colors.js');
client.react = new Map()
const WOKCommands = require('wokcommands')
const guildId = '827204137829007361'
client.on('ready', () => {
  new WOKCommands(client, {
    commandsDir: 'slash',
    testServers: [guildId],
    showWarns: false,
  })
})
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
    const responses = [
        `✅  Success! Loaded Command ${command.name} `,
        `✅  Loaded ${command.name} `,
        `✅  ${command.name} Has Loaded`,
      ];
            const dresponses = responses[Math.floor(Math.random() * responses.length)];
    console.log(colors.green(dresponses));
}

//Event Handler
event_handler.performEvents(client);

client.on('messageDelete', message => {
    let obj = JSON.parse(String(fs.readFileSync('./snipe.json')))

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
        queue.textChannel.send(playSongEmbed)
    })
            //▶️⏸️⏹️🔁🔉🔊
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
    )
	.on("searchNoResult", (message, query) =>
        message.channel.send(`No result found for ${query}!`))
    .on("playList", (queue, song, playlist) =>
        queue.textChannel.send(
            `${client.emotes.play} | Play \`${song.title}\` playlist (${song.total_items
      } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration
      }\`\n${status(queue)}`
        )
    )
    .on("addList", (message, queue, playlist) =>
        message.textChannel.send(`${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`)
    )
    .on("error", (message, err) =>
        console.log(`${client.emotes.error} | An error encountered: ${err.stack}`)
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
    message.channel.send(searchembed).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 61000))
    })
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`));

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
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if (err) console.error(err)
    });
})

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
    )})
/*
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
*/

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


client.on("message", async message => {

    if (message.channel.name == "chatbot") {

        if (message.author.bot) return;
        if (message.content.includes(`Who Made you`)) {
            return message.reply(`The Bot was Made By Darkerink But the Chat bot was made by a great person Called Nekoyasui#6804 \(check them out on github :\) \)`)
        };
        if (message.content.includes(`who made you`)) {
            return message.reply(`The Bot was Made By Darkerink But the Chat bot was made by a great person Called Nekoyasui#6804 \(check them out on github :\) \)`)
        };
        if (message.content.includes(`how many servers are you in`)) {
            return message.reply(`I am in ${client.guilds.cache.size} servers`)
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
        message.reply(`${getting.data}`)
        message.channel.stopTyping();
    }
})
/*
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
*/
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



client.on("messageUpdate", async (oldMessage, message) => {
        try {
            if(message.author.bot) return
            let guild = oldMessage.guild
            let guildData = await client.data.getMsgDB(guild.id);
            if (!guildData.addons.log.enabled) return;

            let logChannel = await client.tools.resolveChannel(guildData.addons.log.channel, guild);
            if (!logChannel) return;
            const log = new Discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ dynamic: true }))
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

const { Menu } = require('discord.js-menu')
client.on('message', message => {
    const { MessageEmbed } = require('discord.js')
    if (message.content === "?darkhelp") {
        /*
         * The menu class takes 4 parameters. 
         * 1) A channel to send the menu to
         * 2) A user ID to give control over the navigation, 
         * 3) An array of Page objects, each being a unique page of the menu
         * 4) How long, in milliseconds, you want the menu to wait for new reactions
         */
        let helpMenu = new Menu(message.channel, message.author.id, [
            {
                /*
                 * A page object consists of three items:
                 * 1) A name. This is used as a unique destination name for reactions.
                 * 2) Some content. This is a rich embed. 
                 * You can use {object: formatting} or .functionFormatting() for embeds. Whichever you prefer.
                 * 3) A set of reactions, linked to either a page destination or a function.* (See example pages)
                 * 
                 * Reactions can be emojis or custom emote IDs, and reaction destinations can be either the names
                 * of pages, () => { functions }, or special destination names. See below for a list of these.
                 */

                /* You can call pages whatever you like. The first in the array is always loaded first. */
                name: 'main',
                content: new MessageEmbed({
                    title: 'Help Menu',
                    description: 'This is some helpful info!',
                    fields: [
                        {
                            name: "Command: Ban",
                            value: "This command bans people.",
                            inline: true
                        }
                    ]
                }),
                reactions: {
                    '😳': 'extra',
                    '😀': async () => {
                        // You can run whatever you like in functions.
                        let res = await message.channel.send("Hey-")
                        setTimeout(() => {
                            return res.edit("listen!")
                        }, 1000)
                    }
                }
            },
            {
                name: 'extra',
                content: new MessageEmbed({
                    title: 'Extra menu',
                    description: 'This is another page.'
                }),
                reactions: {
                    /* You can use custom emotes by using their ID instead of an emoji. */
                    '837401618286248018': 'main',
                    '837401983132368896': 'delete',
                }
            }
        ], 300000)

        /* Run Menu.start() when you're ready to send the menu in chat.
         * Once sent, the menu will automatically handle everything else.
         */ 
        helpMenu.start()

        /* The menu also has a singular event you can use for, well, whatever you like.
         * The "pageChange" event fires just before a new page is sent. You can use
         * this to edit pages on the fly, or run some other logic.
         * It's your menu, man, do whatever.
         * 
         * The "destination" is the Page object it's about to change to.
         */
        helpMenu.on('pageChange', destination => {
            destination.content.title = "Hey, " + message.author.username
        })
    }
})

client.on('message', message => {
    if (message.content === "?ForceInviteMessage") {
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

    message.channel.send(welcomeembed);
}});