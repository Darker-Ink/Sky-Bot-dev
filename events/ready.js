const Discord = require('discord.js');
module.exports = {
    type: 'ready',
    async run(client) {

        console.log(`ready.js has been loaded`);

        let statuses = [
            `:3`,
            `<3 Thanks for helping M4X4 and linkel`,
            `How are you today?`,
            `Cats or Dogs?`,
            `Did you know My Name use to be Snow Bot?`,
            `Don\'t trust danik he will lie to you`,
            `Worship Cthulhu 6 times a day`,
            `Serving ${client.guilds.cache.size} Servers`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`,
            `If you Like Music You are Going To Love Blue Sky`,
            `He wasn\'t seen again`,
            `Bot restarts are common`
        ]
    
        setInterval(() => {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setActivity(status, {
                type: 'PLAYING',
                //url: 'https://twitch.tv/monstercat'
            });
        }, 20000)
    }}