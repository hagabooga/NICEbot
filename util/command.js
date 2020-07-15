const Discord = require("discord.js");
const path = require("path");

// template for a command
// put file in commands folder
// const Command = require("../util/command").Command;

// exports.command = new Command(
//     "",
//     "",
//     "",
//     (self, client, message, args) => {
//     }
// );

class Command {
    /**
     *
     * @param {string} command
     * @param {string} desc
     * @param {string} usage
     * @param {(self: Command, client: Discord.Client, message: Discord.Message, args: Array<string>) => void} run
     * @param {(self: Command, client: Discord.Client) => void} loadInit
     */
    constructor(
        command,
        desc,
        usage,
        run = (self, client, message, args) => {},
        loadInit = (self, client) => {}
    ) {
        this.command = command;
        this.desc = desc;
        this.usage = usage;
        this.loadInit = loadInit;
        this.run = run;
        console.log(`${this.command} constructor succeeded!`);
    }
}

exports.Command = Command;
exports.getFilename = path.basename(path.parse(__filename).base);
