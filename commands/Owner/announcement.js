const { MessageEmbed } = require('discord.js');
const discord = require('discord.js')
const colors = require('colors');

module.exports = {
    name: "announcement",
    description: "",
    ownerOnly: true,
    usage: "",
    aliases: [""],
    category: "Owner",
  run: async (client, message, args) => {
      const guild = client.guilds.cache.map(guild => guild.id);
const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
      const stringOne = `[WARN] ${message.author.tag} Sent a announcement`.yellow;
      console.log(stringOne)
          let ann = args.slice(0).join(" ")
if(!ann) {
            const nomsgerror = new MessageEmbed()
            .setDescription(`You can't send empty text Lol`)
            .setColor("BLUE")

            return message.channel.send(nomsgerror)
        }



channel.send(`${ann}`);
  }}