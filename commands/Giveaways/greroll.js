const ms = require('ms');

module.exports = {
    name: 'greroll',
    description: "rerolls the giveaway",
    aliases: ['gre'],
    category: "Giveaway",
    perms: "MANAGE_MESSAGES",
    disabledbug: true,
    run: async (client, message, args) => {

        let giveaway4 =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) ||
            // Search with messageID
            client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway4) return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        // If the member doesn't have enough permissions
        // If no message ID or giveaway name is specified
        if (!args[0]) {
            return message.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Success message
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                    message.channel.send('This giveaway is not ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });

    }
};
