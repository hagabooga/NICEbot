const Command = require("../util/command").Command;
const fs = require("fs");

exports.command = new Command(
    "ratio",
    "Display good/bad bot ratio",
    "ratio",
    (self, client, message, args) => {
        fs.readFile("counts.txt", function (err, data) {
            data = data.toString().split("\n");
            console.log(data);
            message.channel.send(
                `**Good/Bad Bot Ratio**\n**Time started:** ${
                    data[2]
                }\`\`\`Good: ${data[0]} Bad: ${data[1]}
${
    parseInt(data[0]) > parseInt(data[1])
        ? `Good is winning by ${data[0] - data[1]}!`
        : `Bad is winning by ${data[1] - data[0]}!`
}\`\`\``
            );
        });
    }
);
