const {
    MessageEmbed
} = require("discord.js")
const moment = require("moment")
const {
    getMember
} = require("../../functions.js");

module.exports = {
    name: "whois",
    description: "Get stats of given person or yourself",
    usage: "whois <MENTION>",
    aliases: ["whois", "user"],
    category: "Utility",
    disabledbug: true,
    run: async function(client, message, args) {

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer',
        };

        let user;

        if (!args[0]) {
            user = message.member;
        } else {


            user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => {
                return message.channel.send(":x: Unable to find this Person")
            })
        }
        // user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: Unable to find this Person") })
        //}

        if (!user) {
            return message.channel.send(":x: Unable to find this person!")
        }


        //OPTIONS FOR STATUS

        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
        }

        //NOW BADGES
        if (message.guild.member(`${user.id}`)) {

            let badges = await user.user.flags
            badges = await badges ? badges.toArray() : ["None"]

            let newbadges = [];
            badges.forEach(m => {
                newbadges.push(m.replace("_", " "))
            })

            let embed = new MessageEmbed()
                .setThumbnail(user.user.displayAvatarURL({
                    dynamic: true
                }))

            //ACTIVITY
            let array = []
            if (user.user.presence.activities.length) {

                let data = user.user.presence.activities;

                for (let i = 0; i < data.length; i++) {
                    let name = data[i].name || "None"
                    let xname = data[i].details || "None"
                    let zname = data[i].state || "None"
                    let type = data[i].type

                    array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

                    if (data[i].name === "Spotify") {
                        embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
                    }

                    embed.setDescription(array.join("\n"))

                }
            }

            //EMBED COLOR BASED ON member
            embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)

            //OTHER STUFF 
            embed.setAuthor(user.user.tag, user.user.displayAvatarURL({
                dynamic: true
            }))

            const member = getMember(message, args.join(" "));
            const userFlags = user.flags.toArray();

            const roles = member.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r).join(", ") || 'none';

            //CHECK IF USER HAVE NICKNAME
            if (user.nickname !== null) embed.addField("Nickname", user.nickname)
            embed.addField("Joined At", moment(user.joinedAt).format("LLLL"))
                .addField("Account Created At", moment(user.user.createdAt).format("LLLL"))
                .addField("Common Information", `ID: \`${user.user.id}\`\nDiscriminator: ${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}`)
                .addField('Flags', `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`)
                .setFooter(user.user.presence.status, stat[user.user.presence.status])
                .addField('**Roles:**', ` ${roles}`, true)

            return message.channel.send(embed);

        } else {
            let badges = await user.flags
            badges = await badges ? badges.toArray() : ["None"]

            let newbadges = [];
            badges.forEach(m => {
                newbadges.push(m.replace("_", " "))
            })

            let embed = new MessageEmbed()
                .setThumbnail(user.displayAvatarURL({
                    dynamic: true
                }))

            //ACTIVITY
            let array = []
            if (user.presence.activities.length) {

                let data = user.presence.activities;

                for (let i = 0; i < data.length; i++) {
                    let name = data[i].name || "None"
                    let xname = data[i].details || "None"
                    let zname = data[i].state || "None"
                    let type = data[i].type

                    array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

                    if (data[i].name === "Spotify") {
                        embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
                    }

                    embed.setDescription(array.join("\n"))

                }
            }

            //EMBED COLOR BASED ON member
            embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)

            //OTHER STUFF 
            embed.setAuthor(user.tag, user.displayAvatarURL({
                dynamic: true
            }))

            const member = getMember(message, args.join(" "));
            //const userFlags = member.user.flags.toArray();
            const userFlags = user.flags.toArray();


            //CHECK IF USER HAVE NICKNAME
            embed.addField("Joined At", "Not in the server")
                .addField("Account Created At", moment(user.createdAt).format("LLLL"))
                .addField("Common Information", `ID: \`${user.id}\`\nDiscriminator: ${user.discriminator}\nBot: ${user.bot}\nDeleted User: ${user.deleted}`)
                .addField('Flags', `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`)
                .setFooter(user.presence.status, stat[user.presence.status])

            message.channel.send(embed);

        }

    }
}