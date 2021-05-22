module.exports = {
    name: 'embedjson',
    ownerOnly: true,
    description: 'Send a embed using Json',
    usage: "embedjson <channel> <JSON>",
    category: "Owner",
	hidden: true,
    run: async (client, message, args) => {
    const targetChannel = message.mentions.channels.first()
    if (!targetChannel) {
      message.reply('Please specify a channel to send the embed in')
      return
    }

    // removes the channel mention
    args.shift()

    try {
const embed = {
  "title": "Server Rules",
  "description": "`1.` **Trolling** - Trolling refers to the act of disrupting the chat, making a nuisance out of yourself, deliberately making others uncomfortable, or otherwise attempting to start trouble. This includes spamming\n\n`2.` **Discussing Offensive/Controversial Material** - This includes topics such as politics, religion, acts of violence, (TRIGGER WARNING) ||rape, suicide/self harm, school shootings||, and other serious topics; as well as hate speech including racial slurs or derivatives thereof, sexist or homophobic statements, and other similar types of behavior. Use of banned words will be a permanent ban\n\n`3.` **Elitism** - Refrain from insulting or belittling others based on their personal opinion on a subject.\n\n`4.` **Disrespecting Server Staff** - Refrain from insulting the server helpers or becoming belligerent after being warned. If you think you were unfairly punished by either a helper or bot, use the channel #dispute-punishment.\n\n`5.` **Incitement** - Do NOT encourage the breaking of rules, incite others to be blatantly rude and offensive, or otherwise promote and/or encourage conflicts between other members.\n\n`6.` **Punishment Evasion** - Do not attempt to evade the consequences of your actions by using an alternate account to bypass restrictions. If caught, you will be reported to discord, see here for more info: https://twitter.com/discord/status/1047591291301912578?lang=en\n\n`7.` **Inappropriate User Profiles** - For ease of communication and the comfort of those in chat, your profile picture, custom status, and display name (i.e., the name that shows up while reading the chat) should be Safe For Work (SFW). Furthermore, your display name should also be easily readable, mentionable, and should not attempt to imitate other users or staff or hoist you to the top of the server online list\n\n`8.` **Advertisement** - Do not attempt to promote your own social media/discord servers/other content creation channels.\n\n`9.` **Follow TOS** - This should be pretty obvious, but follow Discords TOS.",
  "color": 0,
  "footer": {
    "text": "Blue Sky || Support Server",
    "icon_url": "https://images-ext-2.discordapp.net/external/LCxKZlaqJwHTaVVM8NKnVTyufRVS5TZKfBTrYrJGmik/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/682090006151561233/988ff206cf286ca9855491ad7067b663.webp?width=472&height=472"
  }
};
      targetChannel.send({ embed });
    } catch (error) {
      message.reply(`Invalid JSON ${error.message}`)
    }
    }}