const {
    MessageEmbed
} = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = {
    name: "serverinfo",
    description: "Get the server info",
    usage: "",
    aliases: ['si', 'sein', 'infoserver', 'sp'],
    category: "Utility",
    run: async (client, message, args) => {
        const db = require('quick.db')
        let user = db.get(`blacklist_${message.author.id}`);
        if (user == true) return;
        // const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        let rolemap = message.guild.roles.cache
        const owner = await message.guild.fetchOwner()

        var roles = ''
        var rc = 0

        message.guild.roles.cache.array().forEach((i) => {
            roles += `<@&${i.id}>, `;
            rc++
        })

        const embed = new MessageEmbed()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField('General', [
				`**» Name:** ${message.guild.name}`,
				`**» ID:** ${message.guild.id}`,
				`**» Owner:** ${owner.user.tag} (${owner.user.id})`,
				`**» Region:** ${regions[message.guild.region]}`,
				`**» Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**» Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**» Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**» Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
            .addField('Statistics', [
				`**» Role Count:** ${rc}`,
				`**» Emoji Count:** ${emojis.size}`,
				`**» Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**» Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**» Member Count:** ${message.guild.memberCount}`,
				`**» Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**» Bots:** ${members.filter(member => member.user.bot).size}`,
				`**» Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**» Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**» Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
            .addField('Presence', [
				`**» Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**» Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**» Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**» Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
            // .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : 'None') for fuck sakes leave it 
            // .addField(`Roles [${rc}]`, roles) danik let me add one thing what do you want to add? error message for when it gets a error
            .setTimestamp();


        if (rc > 30 || roles.length > 1023) embed.addField(`Roles [${rc}]`, `_To many to show If you want to see them all do ?roles_`)
        else embed.addField(`Roles [${rc}]`, roles.slice(0, -1))
        message.channel.send({ embeds: [embed] });
    }
}