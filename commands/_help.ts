import { CommandInteraction, Message } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    await message.reply(
        await client.getLine(message.guild, 'PING_MESSAGE')
    );
}

async function executeSlash(
    client: DiscordBot,
    interaction: CommandInteraction, 
    args: string[]
) {
    await interaction.reply(
        client.getLine(interaction.guild, 'PING_MESSAGE')
    );
}

const command = new Command({
    name: 'help', 
    description: 'Shows a command list.', 
    category: 'Moderation',
    aliases: [],
    exeFunc: execute,
    slash: {
        testing: true,
        exeFunc: executeSlash
    }
})

export = command;