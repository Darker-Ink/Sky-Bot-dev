const Discord = require('discord.js');
const client = new Discord.Client();
const process1 = require('child_process');
const darkpm3 = ('npx pm2 link b0br9edx4fscl1y kmxqb28ia0s0au8')
const darkpm2 = ('npx pm2 start index.js')

process1.exec(darkpm3, (error, stdout) => {
    let result = (stdout || error);
    console.log(result)
})

const timeoutObj = setTimeout(() => {
    process1.exec(darkpm2, (error, stdout) => {
        let result = (stdout || error);
        console.log(result)
    })
}, 10000);
/*console.log(result, { code: "asciidoc", split: "\n"})
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500); 
*/