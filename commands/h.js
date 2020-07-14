const Random = require("yy-random");
const apiRule34Xxx = require("api-rule34-xxx");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 * @param {Array<string>} args The string
 */
exports.run = (client, message, args) => {
    Random.seed(Random.get(2147483647));
    apiRule34Xxx
        .searchByText(args[0], Random.get(15))
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
};
