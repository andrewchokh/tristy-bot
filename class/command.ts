import { CommandInteraction, Message, PermissionResolvable } from "discord.js";
import DiscordBot from "../source/DiscordBot";

class Command {
    name: string;
    description: string;
    category: string;
    permissions: PermissionResolvable;
    aliases: string[];
    exeFunc: Function;
    slash: { 
        testing: boolean; 
        options: object[]; 
        exeFunc: Function; 
    };

    constructor(options: {
        name: string, 
        description: string, 
        category: string,
        permissions?: PermissionResolvable,
        aliases?: string[],
        testing?: boolean,
        options?: object[],
        exeFunc: Function,
        slash?: {
            testing?: boolean,
            options?: object[],
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