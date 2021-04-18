module.exports = {
    name: "emojii",
    description: "To say a emoji without nitro",
    ownerOnly: true,
    usage: "?emojii #channel :nitro:",
    category: "Owner",
    run: async (client, message, args) => {


        let emojis = message.guild.emojis.cache.filter(emoji => emoji.animated);
        const ids = (emojis.map(e => '<' + 'a' + ':' + e.name + ':' + e.id + '>'));
        const names = (emojis.map(e => ':' +
            e.name + ':'));



        let keys = names;
        let values = ids;
        let result = Object.assign.apply({}, keys.map((v, i) => ({
            [v]: values[i]
        })));



        let sayMessage = args.slice(1).join(" ");
        let str = sayMessage;
        let arr = result;
        let new_str = str;

        for (var key in arr) {
            if (!arr.hasOwnProperty(key)) {
                continue;
            }

            new_str = new_str.split(key).join(arr[key])


        }



        let channel = message.mentions.channels.first();
        if (!channel) return message.reply('Please provide a channel');
        if (!sayMessage) return message.reply('Please provide a message');

        channel.send(new_str)

    }
};