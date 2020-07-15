const Command = require("../util/command").Command;
const fs = require("fs");

class Whale {
    constructor() {
        this.money = 500;
    }
}

/** @type {Object} */
var whales;

exports.command = new Command(
    "whale",
    "List Whale game actions",
    "whale",
    (self, client, message, args) => {
        let id = message.author.id;
        if (!whales.hasOwnProperty(id)) {
            message.channel.send(
                "Welcome! This is your first time running this command.\nYou have now created a Whale account!"
            );
            whales[id] = new Whale();
            fs.writeFile("whales.json", JSON.stringify(whales), (err) =>
                console.log(err)
            );
        } else {
            /** @type {Whale} */
            let whale = whales[id];
            switch (args[0]) {
                case "money":
                    message.reply(`you have $${whale.money}.`);
                    break;
                default:
                    message.reply(
                        `Please enter the command with one of these following arguments:
\`\`\`
${client.config.prefix}whale money -> Display your money
\`\`\``
                    );
            }
        }
    },
    (self, client) => {
        console.log("On Load init whale.js!!!");
        fs.access("whales.json", fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                let date = new Date();
                fs.writeFile("whales.json", "{}", function (err) {
                    if (err) throw err;
                    console.log("Created whale.json for the first time!");
                });
                whales = {};
                return;
            }
            fs.readFile("whales.json", function (err, data) {
                whales = JSON.parse(data.toString());
                console.log(whales);
            });
            //file exists
        });
    }
);
