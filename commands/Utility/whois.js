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
            BUGHUNTER_LEVEL_1: '<:BugHunter:846460263229554778>',
            BUGHUNTER_LEVEL_2: '<:BugHunter_2:846460290966487050>',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: '<:Bravery:846447779760701520>',
            HOUSE_BRILLIANCE: '<:Brilliance:846447781661245440>',
            HOUSE_BALANCE: '<:Balance:846447781661245440>',
            EARLY_SUPPORTER: '<:earlysupporter:846447770998800435>',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: '<:Developer:846447890523881572>',
        };
            let user;
        
            if (!args[0]) {
              user = message.member;
            } else {
        
        
        
              user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: Unable to find this Person") })
            }
        
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
            let badges = await user.user.flags
            badges = await badges ? badges.toArray() : ["None"]
        
            let newbadges = [];
            badges.forEach(m => {
              newbadges.push(m.replace("_", " "))
            })
        


            let embed = new MessageEmbed()
              .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        
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
              embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
        
        const member = getMember(message, args.join(" "));
        const userFlags = member.user.flags.toArray();
        const weed = member.roles.highest.id
        const permsss = member.permissions
        .toArray()
        .join(", ")
        .toLowerCase()
            const roles = member.roles.cache
                    .filter(r => r.id !== message.guild.id)
                    .map(r => r).join(", ") || 'none';
        
              //CHECK IF USER HAVE NICKNAME
              if (user.nickname !== null) embed.addField("Nickname", user.nickname)
              embed.addField('Name:', `${user.user.tag}`, true)
              .addField('ID:', `${user.id}`, true)
              .addField('Created at:', `${user.user.createdAt}`, true)
              .addField('Joined:', '4', true)
              .addField('Badges:', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
              .addField('Highest role:', `<@&${weed}>`, true)
              .addField('Roles:', `${roles}`, false)
              message.channel.send(embed);
              const memberPerms = member.permissions.json
              //console.log(permsss)
              let perms = await member.permissions
              let newbadges = [];
              newpermsa.forEach(m => {
                m.replace("_", " ")
                console.log(m)
              })
              //console.log(perms)
            }
          }
                