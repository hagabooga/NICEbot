const Command = require("../util/command").Command;

exports.command = new Command(
    "purpose",
    "My purpose",
    "purpose",
    (self, client, message, args) => {
        message.channel.send({ files: ["https://i.imgur.com/vfhXDJh.jpg"] });
    }
);
