import { Client, ClientOptions, Collection } from "discord.js";
import MongoDB from "./MongoDB";
import Logger from "./Logger";
import path from 'path';
import fs from 'fs';
import botConfig from '../botconfig';

class DiscordBot extends Client {
    botConfig: any;
    commands: any;
    logger: any;
    database: any;

    constructor(opts: ClientOptions) {
        super(opts);

        this.botConfig = botConfig;
        this.commands = new Collection();
        this.logger = new Logger(path.join(__dirname, "..", "Logs.log"));
        this.database = new MongoDB(this.botConfig.mongoUri || "");

        this.loadCommands();
        this.loadEvents();

        this.registerCommandsInDB();
    }  

    loadCommands() {
        const commandsDir = path.join(__dirname, "..", "commands");

        fs.readdir(commandsDir, (err, files) => {
            if (err) return this.logger.error(err);

            files.forEach((file) => {
                if (file.startsWith('_')) return;

                const command = require(commandsDir + "/" + file);

                if (!command.name || !command.description || !command.run)
                    return this.logger.error(
                        "Unable to load File: " +
                        file +
                        ", Reason: File doesn't had run/name/desciption"
                    );

                this.commands.set(command.name, command);

                this.logger.log("Command Loaded: " + command.name);
            });
        })
    }

    loadEvents() {
        const eventsDir = path.join(__dirname, "..", "events");

        fs.readdir(eventsDir, (err, files) => {
          if (err) return this.logger.log(err);

            files.forEach((file) => {
              const event = require(eventsDir + "/" + file);
              this.on(file.split(".")[0], event.bind(null, this));
              this.logger.log("Event Loaded: " + file.split(".")[0]);
            });
        });
    }

    build() {
        try {
            this.login(this.botConfig.token);
        } catch(e) {
            this.logger.log(e);
        }
    };

    canUseCommand(command: any, member: any, channel: any) {
        return require('../utils/canUseCommand')(command, member, channel);
    }

    registerSlashCommands() {
        require('../utils/registerSlashCommands')(this, this.guilds.cache);
    }

    registerCommandsInDB() {
        require('../utils/registerCommandsInDB')(this);
    }
}

export = DiscordBot;