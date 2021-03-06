const Command = require("../util/command").Command;
const fs = require("fs");

class Item {
    constructor(name) {
        this.name = name;
    }
}

class Whale {
    constructor() {
        this.money = 500;
        this.inventory = {};
    }
    addItem(itemName) {
        this.inventory[itemName] = new Item(itemName);
    }
}

/** @type {Object} */
var whales;

function saveData() {
    fs.writeFile("whales.json", JSON.stringify(whales), (err) =>
        console.log(err)
    );
    console.log("SAVED WHALE DATA!!");
}

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
            whales[id].addItem("Money Pouch");
            saveData();
        } else {
            /** @type {Whale} */
            let whale = whales[id];
            switch (args[0]) {
                case "money":
                    message.reply(`you have $${whale.money}.`);
                    break;
                case "buy":
                    message.reply(`Please select an item:
\`\`\`1. Gacha Ticket - $100
\`\`\``);
                    break;
                case "inventory":
                    message.reply(`**Your Inventory**
\`\`\`${Object.keys(whale.inventory)
                        .map((x) => "- " + x)
                        .toString()}
\`\`\``);
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
                // Object.keys(whales).forEach((x) => {
                //     if (!whales[x].hasOwnProperty("inventory"))
                //         whales[x].inventory = {};
                // });
                // saveData();
                // console.log(whales);
            });
            //file exists
        });
    }
);
