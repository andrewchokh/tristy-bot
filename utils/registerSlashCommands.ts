import path from 'path';
import fs from 'fs'; 
import DiscordBot from '../source/DiscordBot';

export = async (client: DiscordBot) => {
    const commandsDir = path.join(__dirname, "..", "commands");

    fs.readdir(commandsDir, async (err, files) => {
        if (err) throw err;

        files.forEach(async (file) => {
            if (file.startsWith('_')) return;

            const command = require(commandsDir + "/" + file);

            if (!command.slash) return;

            const data = {
                name: command.name,
                description: command.description,
                options: command.slash.options,
            };

            if (command.slash.testing) {
                await client.guilds.fetch(client.botConfig.testingServerId)
                    .then((guild: any) => {
                        if (guild) {
                            guild.commands.create(data);

                            client.logger.log('Slash Command For Guild ' + 
                            '"' + guild.name + '"' + 
                            ' Loaded: ' + 
                            command.name);
                        }    
                    });

                return;    
            } 

            client.application?.commands.create(data);

            client.logger.log("Slash Command Loaded: " + command.name);
        });
    });
}