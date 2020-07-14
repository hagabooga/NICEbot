// const fs = require("fs");
// const Discord = require("discord.js");
// const client = new Discord.Client();

// client.once("ready", () => {
//     console.log("Ready!");
// });

// client.on("message", (message) => {
//     if (message.author.bot) return;
//     const msg = message.content.split(" ");
//     let cmd = msg[0];
//     if (cmd.startsWith("!")) {
//         cmd = cmd.substr(1).toLowerCase();
//         // console.log(cmd);
//         if (cmd === "help") {
//             message.channel.send(
//                 "hi I respond to the word nice\n" +
//                     "you can also call me a good or bad bot I guess"
//             );
//         } else if (cmd === "commands") {
//             message.channel.send(
//                 "**Supported Commands:**\n!help | !commands | !purpose | !ree | !wry | !cr"
//             );
//         } else if (cmd === "purpose") {
//             message.channel.send({ file: "https://i.imgur.com/vfhXDJh.jpg" });
//             // png is https://i.imgur.com/NNeBrXZ.png
//         } else if (cmd === "cr") {
//             // message.delete({ timeout: 0 }).catch(console.error);
//             // message.channel.send(`<@${message.member.user.id}>`);
//             if (msg.length > 2 && msg[msg.length - 1].startsWith("<@")) {
//                 message.channel.send(msg[msg.length - 1]).catch(console.error);
//                 msg.pop();
//             }
//             message.channel
//                 .send(
//                     msg
//                         .splice(2)
//                         .reduce((acc, cur) => acc + " " + cur, msg[1])
//                         .toLowerCase()
//                         .split("")
//                         .reduce(
//                             (acc, cur) =>
//                                 acc +
//                                 ("a" <= cur && cur <= "z"
//                                     ? `:regional_indicator_${cur}:`
//                                     : cur === "?"
//                                     ? ":question:"
//                                     : cur === " "
//                                     ? "\t"
//                                     : cur === "!"
//                                     ? ":exclamation:"
//                                     : "") +
//                                 " ",
//                             ""
//                         )
//                 )
//                 .catch(console.error);
//         } else if (cmd === "test") {
//         } else if (cmd === "dp") {
//             if (msg.length > 1)
//                 message.channel.send({
//                     files: [
//                         message.mentions.users.first().displayAvatarURL({
//                             format: "png",
//                             dynamic: false,
//                             size: 4096,
//                         }),
//                     ],
//                 });
//         } else if (cmd === "ree") {
//             message.channel.send("https://www.youtube.com/watch?v=ifDs46V40sk");
//         } else if (cmd === "wry") {
//             message.channel.send("https://www.youtube.com/watch?v=0fLNL0kNzUM");
//         }
//     } else {
//         cmd = message.content.toLowerCase();
//         if (cmd === "nice") {
//             message.channel.send("nice");
//         } else if (message.content.includes("nice")) {
//             message.channel.send("did someone just say");
//             message.channel.send("_ _");
//             message.channel.send("nice");
//         } else if (cmd.startsWith("ree")) {
//             ree = client.emojis.find((emoji) => emoji.name === "ree");
//             if (ree) {
//                 message.channel.send(ree.toString());
//             } else {
//                 message.channel.send("ree");
//             }
//         } else if (cmd === "bad bot") {
//             message.channel.send("sorry");
//         } else if (cmd === "good bot") {
//             message.channel.send("thank");
//         }
//     }
// });
// let key = fs.readFileSync("key.txt").toString();
// client.login(key);

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
// const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.access("counts.txt", fs.F_OK, (err) => {
    if (err) {
        console.error(err);
        let date = new Date();
        fs.writeFile("counts.txt", `0\n0\n${date.toDateString()}`, function (
            err
        ) {
            if (err) throw err;
            console.log("Created counts.txt for the first time!");
        });
        return;
    }
    //file exists
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.login(config.token);
