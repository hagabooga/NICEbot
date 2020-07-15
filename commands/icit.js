const Command = require("../util/command").Command;

exports.command = new Command(
    "icit",
    "I see it",
    "icit",
    (self, client, message, args) => {
        message.channel
            .send("👀")
            .then((x) => x.react("👀"))
            .catch(console.error);
    }
);
