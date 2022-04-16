import DiscordBot from "../source/DiscordBot";
import { Message } from "discord.js";

import guildModel from "../models/guild";

export = async (client: DiscordBot, message: Message) => {
    if (message.author.bot || message.channel.type === "DM" || !message.member) return;

    const guildDB = await guildModel.findOne({id: String(message.guildId)}).exec();
    const prefix = guildDB['prefix'] || client.botConfig.defaultPrefix;
  
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();
    
    const command = client.commands.get(commandName) || 
    client.commands.find((x: any) => x.aliases && x.aliases.includes(commandName));

    const check = await client.canUseCommand(command, message.member, message.channel); 

    if (command && check) 
        command.execute(client, message, args);
};