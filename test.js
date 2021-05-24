const colors = require('colors');
const date = require('date-and-time');
const now = new Date();
const time = (colors.red(date.format(now, 'hh:mm A')))
const Discord = require('discord.js');
const fs = require('fs');
const event_handler = require('./event');
//Command Handler
function getDirectories() {
    return fs.readdirSync("./commands").filter(function subFolders(file) {
        return fs.statSync("./commands/" + file).isDirectory();
    });
}
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
    const folderFiles = fs
        .readdirSync("./commands/" + folder)
        .filter((file) => file.endsWith(".js"));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}
for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(`./commands/${file[0]}/${file[1]}`);
    } else {
        command = require(`./commands/${file}`);
    }
    client.commands.set(command.name, command);
    console.log(colors.green(`[${time}] Command: ${command.name} Has Loaded Right`));
}

//Event Handler
event_handler.performEvents(client);

console.log('All The Commands Work and the bot is ready to go!')

return process.exit(0)
