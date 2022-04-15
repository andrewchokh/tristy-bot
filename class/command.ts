import { CommandInteraction, Message } from "discord.js";
import DiscordBot from "../source/DiscordBot";

class Command {
    // name: string;
    // description: string;
    // category: string;
    // permissions: string[];
    // aliases: string[];
    // test: boolean;
    // options: object;
    // exeFunc: Function;
    // exeSlashFunc: Function;

    // constructor(
    //     name: string, 
    //     description: string, 
    //     category: string,
    //     permissions: string[] = [],
    //     aliases: string[] = [],
    //     test: boolean = false,
    //     options: object = {},
    //     exeFunc: Function,
    //     exeSlashFunc: Function
    // ) {
    //     this.name = name;
    //     this.description = description;
    //     this.category = category;
    //     this.permissions = permissions;
    //     this.aliases = aliases;
    //     this.test = test;
    //     this.options = options;
    //     this.exeFunc = exeFunc;
    //     this.exeSlashFunc = exeSlashFunc;
    // }  
    
    name: string;
    description: string;
    category: string;
    permissions: string[];
    aliases: string[];
    exeFunc: Function;
    slash: { 
        enable: boolean; 
        testing: boolean; 
        options: object[]; 
        exeFunc: Function; 
    };

    constructor(options: {
        name: string, 
        description: string, 
        category: string,
        permissions?: string[],
        aliases?: string[],
        testing?: boolean,
        options?: object[],
        exeFunc: Function,
        slash?: {
            enable: boolean,
            testing: boolean,
            options: object[],
            exeFunc: Function
        }
    }) {
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.permissions = options.permissions || [];
        this.aliases = options.aliases || [];
        this.exeFunc = options.exeFunc;
        this.slash = {
            enable: options.slash?.testing || false,
            testing: options.slash?.testing || false,
            options: options.slash?.options || [],
            exeFunc: options.slash?.exeFunc || Function  
        }
        
    }
    
    execute(client: DiscordBot, message: Message, args: string[]) {
        this.exeFunc(client, message, args);
    }

    executeSlash(client: DiscordBot, interaction: CommandInteraction, args: string[]) {
        this.slash.exeFunc(client, interaction, args);
    }
}

export = Command;