const axios = require('axios')
module.exports = {
    name: 'acti',
    ownerOnly: true,
    description: 'dms a user',
    usage: "dm <message>",
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
    const data = {
        max_age: 86400,
        max_uses: 0,
        target_application_id: "814288819477020702", // youtube together
        target_type: 2,
        temporary: false,
        validate: null
    }
    axios({
        url: `https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`,
        method: 'POST',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            'Authorization': 'Bot ' + process.env.token,
            'Content-Type': 'application/json',
        },
        data: data
    }).then(invite => {
        message.channel.send(`✅ | Click here to start **YouTube Together** : <https://discord.gg/${invite.data.code}>`);
    }).catch(err => {
        console.log(err)
    })
}}
