const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
  name: "instagram",
  aliases: ["insta"],
  category: "Utility",
  description: "Find out some nice instagram statistics",
  cooldown: 10,
  usage: "<username>",
  run: async (client, message, args) => {
    try {
      const name = args.join(" ");

      if (!name) {
        return message
          .reply("Maybe it's useful to actually search for someone...!")
          .then((m) => m.delete(5000));
      }

      const url = `https://instagram.com/${name}/?__a=1`;

      let res;

      try {
        res = await fetch(url).then((url_in) => url_in.json());
      } catch (e) {
        return message
          .reply("I couldn't find that account... :(")
          .then((m) => m.delete({ timeout: 5000 }));
      }

      const account = res.graphql.user;

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${account.full_name}  ${account.is_verified ? "`✅`" : " "}`)
        .setURL(`https://instagram.com/${name}`)
        .setThumbnail(account.profile_pic_url_hd)
        .addField(
          "Profile information",
          stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${
              account.biography.length == 0 ? "none" : account.biography
            }
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`
        );

      message.channel.send(embed);
    } catch (e) {
      message.channel.send(`Cannot find that account 💢!`);
    }
  },
};