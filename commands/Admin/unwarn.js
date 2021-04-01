const mongoose = require("mongoose");
const warnSchema = require("../../models/warnSchema");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove-warn",
  description: "Unwarn someone who was warned",
  usage: "?remove-warn [warn ID] <@mention>",
  aliases: ["rm"],
  category: "Admin",
  run: async (client, message, args) => {
      try {
    const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
    const mentionedUser = message.mentions.users.first();

    if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) {
      const unwarnError = new MessageEmbed()
        .setDescription("You do not have Permission to Unwarn someone")
        .setColor("RED");
      return message.channel.send(unwarnError);
    } else if (!mentionedUser) {
      const unwarnError2 = new MessageEmbed()
        .setDescription("You Need to mention a Member in order to Unwarn them")
        .setColor("RED");
      return message.channel.send(unwarnError2);
    }

    const reason = args.slice(2).join(" ") || "Not Specified";

    const warnDoc = await warnSchema
      .findOne({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      const unwarnError3 = new MessageEmbed()
        .setDescription(`${mentionedUser} does not have any warnings`)
        .setColor("RED");
      return message.channel.send(unwarnError3);
    }

    const warnID = parseInt(args[0]);
    if(!warnID) {
        const noWarnID = new MessageEmbed()
        .setDescription('No WarnID Specified! Please provide a warn ID to clear.\n To check warn ID, use ?warnings <@mention> \n The correct usage of this command is ?unwarn [warnID] <@mention>')
        .setColor("RED")
        return message.channel.send(noWarnID)
    }

    if (warnID <= 0 || warnID > warnDoc.warnings.length) {
      const unwarnError4 = new MessageEmbed()
        .setDescription(
          "This is an invalid warning ID. \n To check warn ID, use ?warnings <@mention>"
        )
        .setColor("RED");
      return message.channel.send(unwarnError4);
    }

    warnDoc.warnings.splice(warnID - 1, warnID !== 1 ? warnID - 1 : 1);

    await warnDoc.save().catch((err) => console.log(err));

    const embed = new MessageEmbed()
      .setDescription(
        `Unwarned ${mentionedUser} \n **Reason:** ${reason ? `**${reason}**` : ""}`)
      .setColor("BLUE");

    message.channel.send(embed);
  }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }
}}