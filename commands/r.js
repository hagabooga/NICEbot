const Command = require("../util/command").Command;

function reset(client, commandName) {
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const command = require(`./${commandName}.js`).command;
    client.commands.set(commandName, command);
    command.loadInit(command, client);
}

exports.command = new Command(
    "r",
    "Reload all/a command(s)",
    "r [command]",
    (self, client, message, args) => {
        if (!args || args.length < 1) {
            let i = 0;
            let length = client.commands.array().length;
            client.commands.forEach((value, commandName, map) => {
                if (i == length) return;
                reset(client, commandName);
                i++;
            });
            console.log("All commands reloaded!");
            message.reply("All commands reloaded!");
        }
        // return message.reply("Must provide a command name to reload.");
        else {
            const commandName = args[0];
            // Check if the command exists and is valid
            if (!client.commands.has(commandName)) {
                return message.reply("That command does not exist");
            }
            reset(client, commandName);
            message.reply(`The command ${commandName} has been reloaded`);
        }
    }
);

// exports.run = (client, message, args) => {
//     if (!args || args.length < 1) {
//         let i = 0;
//         let length = client.commands.array().length;
//         // console.log(length);
//         client.commands.forEach((value, commandName, map) => {
//             if (i == length) return;
//             // console.log(commandName);
//             delete require.cache[require.resolve(`./${commandName}.js`)];
//             client.commands.delete(commandName);
//             const props = require(`./${commandName}.js`);
//             client.commands.set(commandName, props);
//             if (props.hasOwnProperty("load_init")) props.load_init();
//             i++;
//         });
//         console.log("All commands reloaded!");
//         message.reply("All commands reloaded!");
//     }
//     // return message.reply("Must provide a command name to reload.");
//     else {
//         const commandName = args[0];
//         // Check if the command exists and is valid
//         if (!client.commands.has(commandName)) {
//             return message.reply("That command does not exist");
//         }
//         // the path is relative to the *current folder*, so just ./filename.js
//         delete require.cache[require.resolve(`./${commandName}.js`)];
//         // We also need to delete and reload the command from the client.commands Enmap
//         client.commands.delete(commandName);
//         const props = require(`./${commandName}.js`);
//         client.commands.set(commandName, props);
//         if (props.hasOwnProperty("load_init")) props.load_init();
//         message.reply(`The command ${commandName} has been reloaded`);
//     }
// };
