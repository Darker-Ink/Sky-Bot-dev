const config = require('../config/config.json')
const githubhook = new Discord.WebhookClient(config.gitpullhookid, config.gitpullhooktoken);
const exec = require('child_process').exec;
const date = require('date-and-time');
const now = new Date();
const time = (date.format(now, 'YYYY/MM/DD hh:mm'))
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
            `The Time Is ${time}`,
	]

    let atcs = [
        `WATCHING`,
        `PLAYING`,
        `LISTENING`,
]

// Credit goes to DanBot hosting's discord bot!
setInterval(() => {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    //console.log('Bot already up to date. No changes since last pull')
                } else {
                    githubhook.send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                    setTimeout(() => {
			        process.exit()
                    }, 1000)
                };
            }
        })
    }, 30000)
    setInterval(() => {
        var oss = require('os-utils');
const ms = require('ms')
const os = require('os')
const channel = client.channels.cache.get('849427878914424852')
function formatBytes(bytes) {
                if (bytes === 0) return '0 Bytes';
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
            }
oss.cpuUsage(function(v){
channel.setTopic(`MEM USAGE: ${formatBytes(process.memoryUsage().heapUsed)}\nCPU Usage: ${v.toFixed(2)}%\nUPTIME: ${ms(os.uptime() * 1000, { long: true })}\nPING: ${client.ws.ping}\nDan Is hot`)
});
    }, 30000)
        setInterval(() => {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            let atttscs = atcs[Math.floor(Math.random() * atcs.length)]
            client.user.setActivity(status, {
                type: `${atttscs}`,
            });
        }, 60000)
    }
}
