const options = [
           "!",
           "?",
    	   ">",
    	   "<",
           '/',
           '\'',
           '~',
           '#',
           '@',
           '+',
           '=',
           '(',
           '*',
           '&',
           '^',
           '%',
           '$',
           '[',
           '`',
           '1',
           '2',
           '3',
           '4',
           '5',
           '6',
           '7',
           '8',
           '9',
           '_',
           '-',
           '.',
           '¿'
];

module.exports = {
    name: "antihoister",
    aliases: ["attentionnick", "anick"],
    description: "Changes all the users Nicks that are tying to hoist their name to what you want",
    category: "Admin",
    usage: "?antihoister <new nickname>",
    perms: ["MANAGE_NICKNAMES"],
    botperms: ["MANAGE_NICKNAMES"],
    run: async (client, message, args) => {
        try {
            const name = args.join(" ");
            if (!name) return message.reply("Also provide the new nickname you want for hoisters.").then(m => m.delete(15000));
            for (i = 0; i < options.length; i++) {
                const user = message.guild.members.cache.filter(m => m.displayName.startsWith(options[i]));
                user.forEach(u => u.setNickname(name));
            }
            message.channel.send(`Successfully changed nicknames of all hoister\'(s)`);
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("827716948087013406").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}