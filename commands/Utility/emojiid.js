module.exports = {
    name: "emojiid",
    description: "To get a emoji ID without Nitro",
    usage: "?emojiid #channel :nitro:",
    run: async (client, message, args) => {

        let emojis = message.guild.emojis.cache.filter(emoji => emoji.animated);
        const ids = (emojis.map(e => '<' + 'a' + ':' + e.name + ':' + e.id + '>'));
        const names = (emojis.map(e => ':' +
            e.name + ':'));


		if (!args[0] > 0) return message.channel.send("<a:DarkPet:833162248527937536> What Emoji do you want me to send?")
        let keys = names;
        let values = ids;
        let result = Object.assign.apply({}, keys.map((v, i) => ({
            [v]: values[i]
        })));


		let sayMessage = args[0];
        let str = sayMessage;
        let arr = result;
        let new_str = str;

        for (var key in arr) {
            if (!arr.hasOwnProperty(key)) {
                continue;
            }

            new_str = new_str.split(key).join(arr[key])


        }


        message.channel.send(`\\${new_str}`)

    }
};