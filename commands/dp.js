const Command = require("../util/command").Command;

exports.command = new Command(
    "dp",
    "Get user's display picture",
    "h [@mention_user]",
    (self, client, message, args) => {
        message.channel.send({
            files: [
                message.mentions.users.array().length > 0
                    ? message.mentions.users.first().displayAvatarURL({
                          format: "png",
                          dynamic: false,
                          size: 4096,
                      })
                    : message.author.displayAvatarURL({
                          format: "png",
                          dynamic: false,
                          size: 4096,
                      }),
            ],
        });
    }
);
