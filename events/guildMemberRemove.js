module.exports = {
    type: 'guildMemberRemove',
    async run(client, member) {
        try {
            let guild = member.guild;
            let guildData = await client.data.getGuildDB(guild.id);
            if (!guildData.addons.goodbye.enabled) return;

            let goodbyeChannel = await client.tools.resolveChannel(guildData.addons.goodbye.channel, guild);
            if (!goodbyeChannel) return;

            let goodbyeMsg = (guildData.addons.goodbye.message === null || guildData.addons.goodbye.message === "" || guildData.addons.goodbye.message === " ") ? "{user.ping} has left the server!" : guildData.addons.goodbye.message;

            let finalMsg = await goodbyeMsg
                .replace("{user.ping}", `${member.user}`)
                .replace("{user.name}", `${member.user.username}`)
                .replace("{user.id}", `${member.user.id}`)
                .replace("{user.tag}", `${member.user.tag}`)
                .replace("{guild.name}", `${guild.name}`)
                .replace("{guild.id}", `${guild.id}`)
                .replace("{guild.totalUser}", `${guild.members.cache.size}`);

            return goodbyeChannel.send(finalMsg)

        } catch (e) {
            console.log(e);
        }

    }
};