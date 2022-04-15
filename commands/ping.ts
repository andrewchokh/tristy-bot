import { CommandInteraction, Message } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    await message.reply('Pong!');
}

async function executeSlash(
    client: DiscordBot,
    interaction: CommandInteraction, 
    args: string[]
) {
    await interaction.reply('Pong!');
}

const command = new Command({
    name: 'ping', 
    description: 'Replies with pong.', 
    category: 'Moderation',
    aliases: ['pi'],
    exeFunc: execute,
    slash: {
        enable: true,
        testing: true,
        options: [],
        exeFunc: executeSlash
    }
})

export = command;