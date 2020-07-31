const Discord = require("discord.js");
const fs = require("fs");

function dofile(i) {
    fs.readFile("counts.txt", function (err, data) {
        data = data.toString().split("\n");
        // console.log(data);
        data[i] = parseInt(data[i]);
        data[i]++;
        fs.writeFile(
            "counts.txt",
            data.reduce((a, c) => a + "\n" + c),
            function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log(i + " counts.txt was saved!");
            }
        );
    });
}

/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 */
module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.toLowerCase().trim() === "good bot") {
        message.channel.send("thank");
        dofile(0);
    } else if (message.content.toLowerCase().trim() === "bad bot") {
        message.channel.send("sorry");
        dofile(1);
    } else if (message.content.toLowerCase().trim() === "shit bot") {
        message.channel.send("oof");
        for (let i = 0; i < 5; i++) dofile(1);
    } else if (message.content.toLowerCase().trim() === "god bot") {
        message.channel.send("😍");
        dofile(0);
    } else if (message.content.toLowerCase().trim().startsWith("ree")) {
        message.react("560636518495027200");
    } else if (message.content.toLowerCase().trim() === "nice") {
        message.channel.send("nice");
    } else if (message.content.includes("nice")) {
        message.channel.send(
            `did someone just say

nice`
        );
    } else if (message.content.indexOf(client.config.prefix) !== 0) return;
    {
        // Our standard argument/command name definition.
        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();
        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);
        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;
        // Run the command
        cmd.run(cmd, client, message, args);
    }
};
