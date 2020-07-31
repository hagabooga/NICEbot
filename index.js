const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
// const { command } = require("./commands/icit");
client.config = config;

// const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.access("counts.txt", fs.F_OK, (err) => {
    if (err) {
        console.error(err);
        let date = new Date();
        fs.writeFile("counts.txt", `0\n0\n${date.toDateString()}`, function (
            err
        ) {
            if (err) throw err;
            console.log("Created counts.txt for the first time!");
        });
        return;
    }
    //file exists
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        // console.log(file);
        let command_file = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        // console.log(`Loading command: ${commandName}`);
        client.commands.set(commandName, command_file.command);
        command_file.command.loadInit(command_file, client);
    });
});

client.login(config.token);
