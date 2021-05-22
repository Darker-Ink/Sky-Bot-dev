const Discord = require('discord.js');

module.exports = {
    name: 'testo', //This is for the Name of the command
    usage: "This is a example usage", //This lets the user Know how to use the command
    description: 'This is a example Description', //Gives a easy description
    category: "Example", // What category the command should be in
    aliases: "", // Lets people use the command different way IE ping becomes p
    cooldown: 0, // The cooldown for the command
    ownerOnly: true, // If the command can only be used by the Owner
    hidden: false, // If you want the command to be hidden
    disabledbug: false, // If the command has been has been disabled due to a bug
    disabled: false, // If the command is still being Made
    perms: [], // The perms the user needs
    botperms: [], // The perms the bot needs
    readbotrules: false, // This is **VERY** userful It is for commands I.E. Logging If it is turned on The user needs to read the rules and Accpet them, This is to save my ass for people who don't want to get logged I.E. messages and So discord can Verify me or maybe a Log bot I make
    run: async (client, message, args, data) => {
    // Stuff I.E command
    const guilds = client.guilds.cache.array()

/**
 * Creates an embed with guilds starting from an index.
 * @param {number} start The index to start from.
 */
const generateEmbed = start => {
  const current = guilds.slice(start, start + 10)

  // you can of course customise this embed however you want
  const embed = new MessageEmbed()
    .setTitle(`Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`)
  current.forEach(g => embed.addField(g.name, `**ID:** ${g.id}
**Owner:** ${g.owner.user.tag}`))
  return embed
}

// edit: you can store the message author like this:
const author = message.author

// send the embed with the first 10 guilds
message.channel.send(generateEmbed(0)).then(message => {
  // exit if there is only one page of guilds (no need for all of this)
  if (guilds.length <= 10) return
  // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
  message.react('➡️')
  const collector = message.createReactionCollector(
    // only collect left and right arrow reactions from the message author
    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
    // time out after a minute
    {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
    // remove the existing reactions
    message.reactions.removeAll().then(async () => {
      // increase/decrease index
      reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
      // edit message with new embed
      message.edit(generateEmbed(currentIndex))
      // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
      if (currentIndex !== 0) await message.react('⬅️')
      // react with right arrow if it isn't the end
      if (currentIndex + 10 < guilds.length) message.react('➡️')
    })
  })
})

  },
};
