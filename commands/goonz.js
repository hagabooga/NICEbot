const Command = require("../util/command").Command;

exports.command = new Command(
    "goonz",
    "Le Goonz With Ze Boonz",
    "goonz",
    (self, client, message, args) => {
        message.channel.send({ files: [".\\images\\jihoon.png"] });
    }
);
