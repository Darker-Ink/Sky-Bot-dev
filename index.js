const colors = require('colors');
const date = require('date-and-time');
const now = new Date();
global.time = (colors.red(date.format(now, 'hh:mm A')))
global.Discord = require("discord.js");
global.discord = require('discord.js');
const Util = require("discord.js")
require("dotenv").config();
fetch = require("node-fetch");
const client = new Discord.Client({
     allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
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

//Client stuff

client.distube = new Distube(client, {
    searchSongs: 1,
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

// Global stuff
global.MessageEmbed = require('discord.js')
global.Embed = new Discord.MessageEmbed()
global.errorHook = new Discord.WebhookClient('845648143058993174', 'TZpfpqxDXzI3iHnNjSEn7FB1cMrIUzsNGdeNwijxBJlJakXsKttKUDIzIMq-BPR_u61U');
global.errorhook = new Discord.WebhookClient('845648143058993174', 'TZpfpqxDXzI3iHnNjSEn7FB1cMrIUzsNGdeNwijxBJlJakXsKttKUDIzIMq-BPR_u61U');
const pm2stats = new Discord.WebhookClient('846411328234717215', 'i9GUJQlHHY11haR-MfkJIuYf7kGeEGTE6dLh_s--InaYgleYbDucH6KWk25J9F5nOHx2')
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
    //console.log(colors.green(`[${time}] Command Loaded: ${command.name}`));
    pm2stats.send(`Command Loaded: ${command.name}`)
}

//Event Handler
event_handler.performEvents(client);
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
            queue.textChannel.send(embed)
})
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
/*
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}  ${giveaway.messageURL}`);
});
*/

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

const {
    inspect
} = require("util")
process.on('unhandledRejection', (reason, promise) => {
    errorHook.send(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``)
})
process.on('uncaughtException', (err, origin) => {
    errorHook.send(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`)
})
process.on('warning', (warn) => {
    errorHook.send(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn}\n\`\`\``)
})


/*
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
*/

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
client.db2 = require("quick.db");
client.request = new (require("rss-parser"))();
client.config3 = require("./config.js");
client.on("ready", () => {
    handleUploads();
});
function handleUploads() {
    if (client.db2.fetch(`postedVideos`) === null) client.db2.set(`postedVideos`, []);
    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config3.channel_id}`)
        .then(data => {
            if (client.db2.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                client.db2.set(`videoData`, data.items[0]);
                client.db2.push("postedVideos", data.items[0].link);
 		const webhookClient = new Discord.WebhookClient('845412211517030470', 'WzyAItNNHD68BoS_hXr56rhYWaCXqRY3OwD90WY1NNM-6skwpww7xjpYEO8Vl6vLfR9r');
                let parsed = client.db2.fetch(`videoData`);
                let channel = client.channels.cache.get(client.config3.channel);
                if (!channel) return;
                let message = client.config3.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
		webhookClient.send(message);
            }
        });
    }, client.config3.watchInterval);
}

client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'user-info',
			description: 'Replies with The users interaction info!',
		};

		const command = await client.guilds.cache.get('827204137829007361')?.commands.create(data);
	}
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
    const test = ('833191088842866708')

	if (interaction.commandName === 'user-info') {
        const stuff = (JSON.stringify(interaction.user.flags))
const embed = new Discord.MessageEmbed()
  embed.addField(`id:`, `${interaction.user.id}`),
  embed.addField(`system:`, `${interaction.user.system}`),
  embed.addField(`flags:`, `${stuff}`),
  embed.addField(`username:`, `${interaction.user.username}`),
  embed.addField(`bot:`, `${interaction.user.bot}`),
  embed.addField(`discriminator:`, `${interaction.user.discriminator}`),
  embed.addField(`avatar:`, `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`),
  embed.addField(`lastMessageID:`, `${interaction.user.lastMessageID}`),
  embed.addField(`lastMessageChannelID:`, `${interaction.user.lastMessageChannelID}`)
		await client.users.cache.get('379781622704111626').send(`${interaction.user.username}#${interaction.user.discriminator} Used ${interaction.commandName}`)
        await interaction.reply(embed);
		const message = await interaction.fetchReply();
        const ink = await interaction.user;
        console.log(ink)
	}
});


client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'echo',
			description: 'Replies with your input!',
			options: [{
				name: 'input',
				type: 'STRING',
				description: 'The input which should be echoed back',
				required: true,
			}],
		};

		const command = await client.guilds.cache.get('827204137829007361')?.commands.create(data);
	}
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'echo') {
        await interaction.reply(`${interaction.options[0].value}`, { ephemeral: false });
        console.log(interaction)
}});

client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'suggest',
			description: 'Suggest something for the Discord bot',
			options: [{
				name: 'suggestion',
				type: 'STRING',
				description: 'What you want to suggest.',
				required: true,
			}],
		};

		const command = await client.guilds.cache.get('827204137829007361')?.commands.create(data);
	}
});
const db = require('quick.db')
client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
    const guild = client.guilds.cache.get("827204137829007361")
    const channel = client.channels.cache.get('832805317338857483')
	if (interaction.commandName === 'suggest') {
let num = db.fetch(`number_`)
if (num === null) num = 0;
const suggestion = interaction.options[0].value
const random1 = interaction.user.id
const author1 = interaction.user.tag
const author2 = interaction.user.id
const embed = new Discord.MessageEmbed()
 embed.setAuthor(`${author1}`, interaction.user.displayAvatarURL({dynamic: true}))
embed.addField(`Suggestion #${num}`, suggestion)
embed.setFooter(`ID: ${random1}`)
embed.setColor('#7289da')
        await db.add(`number_`, 1)
        const random = await channel.send(embed)
        await interaction.reply("Your suggestion has been submitted.");
        const sug = new suggestionModel({
			suggestion: suggestion,
			message: random.id,
			author: author2,
            number: num,
		});
		await sug.save();
    }
});


client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'suggestion',
			description: 'For replying to a suggestion!',
			defaultPermission: false,
            options: [{
				name: 'id',
				type: 'STRING',
				description: 'The Suggestion ID',
				required: true,
            }, 
                {
                name: 'option',
				type: 'STRING',
				description: 'An Option',
				required: true,
			choices: [
					{
						name: 'Accept',
						value: 'Accepted',
					},
					{
						name: 'Deny',
						value: 'Denied',
					},
					{
						name: 'Consider',
						value: 'Considered',
                    },
                ],
            },
               {
				name: 'reason',
				type: 'STRING',
				description: 'The Reason',
				required: true,
            }, 
                      ]}
        const permissions = [
			{
				id: '827722669524123658',
				type: 'ROLE',
				permission: true,
			},
		];

		const command = await client.guilds.cache.get('827204137829007361')?.commands.create(data);
        await command.setPermissions(permissions);
	}
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'suggestion') {
        const channel = client.channels.cache.get("832805317338857483")
		const token = interaction.options[0].value;
        const model = await suggestionModel.findOne({ message: token });
        const guild = client.guilds.cache.get("827204137829007361")
		const member = guild.members.cache.get(interaction.user.id);
        if (!config.owners.includes(interaction.user.id)) {
            return interaction.reply("ERROR: You can't use this command", { ephemeral: true })
        }
	
	if (!model) {
            return interaction.reply("That message ID or suggestion ID is invalid or Has been deleted, Please Try again", { ephemeral: true });
    }
	await interaction.reply(JSON.stringify(interaction.options), { ephemeral: true })
	const msg = await client.channels.cache.get("832805317338857483").messages.fetch(model.message);
        const author = await client.users.cache.find((u) => u.id === model.author);
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(`${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }))
		embed.addField(`Suggestion #${model.number}`, `${model.suggestion}`)
        embed.setFooter(`ID: ${author.id}`)
        embed.addField(`${interaction.options[1].value} By ${interaction.user.tag}`, interaction.options[2].value)
if(`${interaction.options[1].value}` === "Accepted") {
    embed.setColor('GREEN')
} else if(`${interaction.options[1].value}` === "Denied") {
        embed.setColor('RED')
} else if(`${interaction.options[1].value}` === "Considered") {
        embed.setColor('YELLOW')
}
channel.messages.edit(msg, embed)
}});

client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'play',
			description: 'play some music!',
			options: [{
				name: 'input',
				type: 'STRING',
				description: 'The input which should be echoed back',
				required: true,
			}],
		};

		const command = await client.guilds.cache.get('827204137829007361')?.commands.create(data);
	}
});
const wait = require('util').promisify(setTimeout);
client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'play') {
        await interaction.reply(`Thinking....`, { ephemeral: false });
    let songName = interaction.options[0].value
        const guild = client.guilds.cache.get("827204137829007361")
		const member = guild.members.cache.get(interaction.user.id);
		const voiceChannel = member.voice.channel;
        if (!member.voice.channel) {
                return interaction.editReply("Do you want me to message you the song? Join a VC", { ephemeral: true })
            }
            voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
                connection.voice.setSuppressed(false);
            })
    		await wait(500);
    		const message = await interaction.editReply(`Playing \`${songName}\``);
           client.distube.play(message, songName)
}});

client.on('message', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!!deploy' && message.author.id === client.application?.owner.id) {
		const data = {
			name: 'help',
			description: 'get some help!',
			options: [{
				name: 'command',
				type: 'STRING',
				description: 'See a command\'s info',
				required: false,
			}],
		};

		const command = await client.application?.commands.create(data);
	}
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'help') {
        const { readdirSync } = require("fs");
        const roleColor = 'GREEN'
        const { MessageEmbed } = require("discord.js")
if (!interaction.options[0]?.value) {
            let categories = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir === 'Owner') return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.filter((command) => {
                    let file = require(`./commands/${dir}/${command}`);
                    //return  !file.nsfwOnly && interaction.channel.nsfw
                    if(!interaction.channel.nsfw) {
                    return !file.nsfwOnly;
                }
                    return !file.hidden;
                }).map((command) => {
                    let file = require(`./commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "To See NSFW commands Use Help In a NSFW channel." : cmds.join(" "),
                };

                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle(`${client.user.username} | Version: ${client.config.version} | Command Amount: ${client.commands.size}`)
                .addFields(categories)
                .setDescription(
                    `Latest Update News: New Command msglog, It lets you Log messages. Snipe command has also been disabled`
                )
                .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(roleColor);
            return interaction.reply(embed);
} else {
    const command =
                client.commands.get(interaction.options[0]?.value.toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(interaction.options[0]?.value.toLowerCase())
                );

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`?help\` for all of my commands!`)
                    .setColor("FF0000");
                return interaction.reply(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "COMMAND:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "ALIASES:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "DESCRIPTION:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .addField(
                    "PERMS NEEDED:",
                    command.perms ?
                    command.perms :
                    "No Perms needed."
                )
                .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(roleColor);
            return interaction.reply(embed);
}}})