const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
var ree;
client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", (message) => {
    if (message.author.bot) return;
    const msg = message.content.split(" ");
    let cmd = msg[0];
    if (cmd.startsWith("!")) {
        cmd = cmd.substr(1).toLowerCase();
        // console.log(cmd);
        if (cmd === "help") {
            message.channel.send(
                "hi I respond to the word nice\n" +
                    "you can also call me a good or bad bot I guess"
            );
        } else if (cmd === "commands") {
            message.channel.send(
                "**Supported Commands:**\n!help | !commands | !purpose | !ree | !wry | !cr"
            );
        } else if (cmd === "purpose") {
            message.channel.send({ file: "https://i.imgur.com/vfhXDJh.jpg" });
            // png is https://i.imgur.com/NNeBrXZ.png
        } else if (cmd == "cr") {
            // message.delete({ timeout: 0 }).catch(console.error);
            // message.channel.send(`<@${message.member.user.id}>`);
            if (msg.length > 2 && msg[msg.length - 1].startsWith("<@")) {
                message.channel.send(msg[msg.length - 1]).catch(console.error);
                msg.pop();
            }
            message.channel
                .send(
                    msg
                        .splice(2)
                        .reduce((acc, cur) => acc + " " + cur, msg[1])
                        .toLowerCase()
                        .split("")
                        .reduce(
                            (acc, cur) =>
                                acc +
                                ("a" <= cur && cur <= "z"
                                    ? `:regional_indicator_${cur}:`
                                    : cur === "?"
                                    ? ":question:"
                                    : cur === " "
                                    ? "\t"
                                    : cur === "!"
                                    ? ":exclamation:"
                                    : "") +
                                " ",
                            ""
                        )
                )
                .catch(console.error);
        }
        // else if (cmd === '!PURPOSELOCAL'){
        //     message.channel.send({files: ['./images/purpose.png'] });
        // }
        else if (cmd === "ree") {
            message.channel.send("https://www.youtube.com/watch?v=ifDs46V40sk");
        } else if (cmd === "wry") {
            message.channel.send("https://www.youtube.com/watch?v=0fLNL0kNzUM");
        }
    } else if (cmd === "NICE") {
        message.channel.send("nice");
    } else if (message.content.includes("nice")) {
        message.channel.send("did someone just say");
        message.channel.send("_ _");
        message.channel.send("nice");
    } else if (cmd.startsWith("REE")) {
        ree = client.emojis.find((emoji) => emoji.name === "ree");
        if (ree) {
            message.channel.send(ree.toString());
        } else {
            message.channel.send("ree");
        }
    } else if (cmd === "bad bot") {
        message.channel.send("sorry");
    } else if (cmd === "good bot") {
        message.channel.send("thank");
    }
});

let key = fs.readFileSync("key.txt").toString();
client.login(key);
