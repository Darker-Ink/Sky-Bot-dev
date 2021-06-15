const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mutes The Mentioned User!",
    category: "Admin",
    perms: ["MANAGE_ROLES"],
    botperms: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        try {

            const user = message.mentions.members.first()

            if (!user) {
                return message.channel.send("Please Mention The User I Need To Mute");
            }

            if (user.id === message.author.id) {
                return message.channel.send("Haha I See What You\'re Trying To Do Here xD");
            }

            let reason = args.slice(1).join(" ")

            if (!reason) {
                return message.channel.send("Please Give A Reason To Mute The Person!")
            }


            let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

            if (!muterole) {
                return message.channel.send("This server Does not have a role called **Muted** Please make a role called Muted to use this command!")
            }

            if (user.roles.cache.has(muterole)) {
                return message.channel.send("Given User Is Already Muted")
            }

            const embed = new MessageEmbed()
                .setAuthor(`You Muted ${message.mentions.users.first().username} | Reason - ${reason}`)
                .setColor("BLUE")




            try {
                user.roles.add(muterole)
                await message.channel.send(embed)
                user.send(`You Are Muted in ${message.guild.name}`)
            } catch (error) {
                console.log(error)
                message.channel.send("Make Sure Your Server has a role named `Muted` And the Appropriate Permissions are set!")
            }

        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }

    }
}