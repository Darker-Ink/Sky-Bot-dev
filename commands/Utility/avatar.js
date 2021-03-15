const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: "Get a user's/your Avatar",
    usage: "?avatar <@mention>",
    aliases: [],
    category: "Utility",
    nsfwOnly: true,
    run: async(client, message, args) => {
      const db = require('quick.db')
let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;

      try {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({ dynamic: true, size: 1024 })

        const embed = new MessageEmbed()
        .setTitle(`${member.tag}\'s Avatar`)
        .setImage(avatar)

        message.channel.send(embed)
    }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Darkerink Already Got the error and Got ping He will check it out soon but anyways here is the error, \n\n**${err}**`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}