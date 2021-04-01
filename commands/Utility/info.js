const Discord = require('discord.js');
module.exports = {
    name: 'info',
    ownerOnly: true,
    usage: "Info",
    description: 'Get Info',
    category: "Utility",
    cooldown: 8,
    run: async (client, message, args) => {      
        const embed = new Discord.MessageEmbed()
        .setTitle("Some Simple Info About the bot!")
        .addField("Prefix Info", "The default prefix is \`?\` But It is changeable Just Do \`?setprefix !\` or something else The prefix can be anything as long as it is Under 5 characters!", true)
        .addField("Data Info", "Your Data ||Id and Guild|| Are stored in a Database that is very secure So you Don't got to worry!", true)
        .addField("Chat Bot Info", "If you make a channel called chatbot and chat in it the bot will respond to you Do not abuse it, we can blacklist you at any time!", true)
        .addField("Open Source Info", "The Bot will Most Likely Never become Open Sourced I am adding code that will make sure that anyone that uses code will not be able to even run it :\)", true)
        .addField("Bugs Info", "Finding a bug is pretty easy, I have over 100 commands and Do not have the time to test them all, If you find a bug just report it [here](https://google.com) or dm DarkerInk#6115", true)
        .addField("BlackListing Info", "I hate people that Abuse Bots, I will Blacklist anyone that abuses this bot But, If you get Blacklisted Fill out [This](https://google.com) and You Might get Unblacklisted!", true)
        .setColor("#420420") //Nice
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    }}