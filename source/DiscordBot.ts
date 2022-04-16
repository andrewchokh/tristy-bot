import { Channel, Client, ClientOptions, Collection, Guild, GuildMember } from "discord.js";
import Logger from "./Logger";
import path from 'path';
import fs from 'fs';
import botConfig from '../botconfig';
import Command from "../class/command";

class DiscordBot extends Client {
    botConfig: any;
    commands: any;
    logger: any;
    languages: any;

    constructor(opts: ClientOptions) {
        super(opts);

        this.botConfig = botConfig;
        this.languages = new Collection();
        this.commands = new Collection();
        this.logger = new Logger(path.join(__dirname, "..", "Logs.log"));

        this.loadLanguages();
        this.loadCommands();
        this.loadEvents();
    }  

    loadLanguages() {
        const commandsDir = path.join(__dirname, "..", "languages");

        fs.readdir(commandsDir, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                if (file.startsWith('_')) return;

                const language = require(commandsDir + "/" + file);    
                const name = file.split('.')[0].toLowerCase();

                this.languages.set(name, language);

                this.logger.log("Language Loaded: " + name);
            });
        })
    }

    loadCommands() {
        const commandsDir = path.join(__dirname, "..", "commands");

        fs.readdir(commandsDir, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                if (file.startsWith('_')) return;

                const command = require(commandsDir + "/" + file);    

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

    canUseCommand(command: Command, member: GuildMember, channel: Channel) {
        return require('../utils/canUseCommand')(command, member, channel);
    }

    connectDB() {
        require('../utils/connectDB')(this);
    }

    getLine(guild: Guild | null, line: string) {
        return require('../utils/getLine')(this, guild, line);
    }

    registerSlashCommands() {
        require('../utils/registerSlashCommands')(this);
    }

    registerCommandsInDB() {
        require('../utils/registerCommandsInDB')(this);
    }
}

export = DiscordBot;