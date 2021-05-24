const githubhook = new Discord.WebhookClient('832350968837308486', 'FxTirx2pPs3OHL5MjuR7rn4Rmre8HinUkMjpjdvKye_e-5A2e_uATnyr8vfoo6O67m-c');
const exec = require('child_process').exec;
module.exports = {
    type: 'ready',
    async run(client) {
        console.log(`ready.js has been loaded`);

        let statuses = [
            `How are you today?`,
            `Serving ${client.guilds.cache.size} Servers`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`,
            `He wasn\'t seen again`,
	        `Discord\'s API`,
	]

setInterval(() => {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    //console.log('Bot already up to date. No changes since last pull')
                } else {
                    githubhook.send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                    setTimeout(() => {
                      exec('npx pm2 restart 0')
			//process.exit()
                    }, 1000)
                };
            }
        })
    }, 30000)

        setInterval(() => {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setActivity(status, {
                type: 'PLAYING',
                //url: 'https://twitch.tv/monstercat'
            });
        }, 60000)
    }
}
