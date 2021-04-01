const config = require('../../config/config.json');

module.exports = {
    name: 'idinvite',
    guildOnly: false,
    ownerOnly: true,
    description: 'Reload the commands',
    aliases: ['idinv'],
    usage: "reload <command>",
    category: "Owner",
    run: async (client, message, args) => {
      try {

        if (!args[0]) return message.channel.send("Enter An Name")

        if(args[0]){
            let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
            let found = client.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("Invalid Name!");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("An Error Has Occured Try Again!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - client is Not in this server`);
        }
      }catch (error) {
      message.reply(`Made me add this so here is a damn error:, \n\n**${error}**`);
      }}
}