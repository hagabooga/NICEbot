const Random = require("yy-random");
const apiRule34Xxx = require("api-rule34-xxx");
const Command = require("../util/command").Command;

exports.command = new Command(
    "h",
    "Query a Rule 34 image",
    "h <query>",
    (self, client, message, args) => {
        if (!message.channel.nsfw) {
            message
                .delete()
                .then((x) =>
                    x.author.send(
                        `You can only use the ${client.config.prefix}h command in NSFW channels!`
                    )
                );
            return;
        }
        Random.seed(Random.get(2147483647));
        apiRule34Xxx
            .searchByText(
                args.reduce((acc, cur) => acc + " " + cur, " "),
                Random.get(15)
            )
            .then((x) =>
                apiRule34Xxx
                    .getPost(x[Math.floor(Random.get(1, true) * x.length)].id)
                    .then((y) => {
                        Random.seed(Random.get(2147483647));
                        for (const z of y.pages[
                            Math.floor(Random.get(1, true) * y.pages.length)
                        ].imgURL) {
                            console.log(z);
                            message.channel
                                .send({ files: [z] })
                                .catch(console.error);
                            break;
                        }
                    })
            )
            .catch(console.err);
    }
);
