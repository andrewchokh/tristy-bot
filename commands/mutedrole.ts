import { CommandInteraction, Message } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';
import guildModel from '../models/guild'

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    if (!args.length) return await message.channel.send(
        "Invalid arguments"
    );

    if (args[0] === 'clear') {
        await guildModel.updateOne({id: message.guildId}, {mutedrole: null});

        return await message.reply(
            `The mute role has been cleared.`
        );
    }

    const mutedRoleId = message.mentions.roles.first()?.id || null;

    await guildModel.findOneAndUpdate({id: message.guildId}, {mutedrole: mutedRoleId});

    await message.reply(
        `The mute role has been updated to ${args[0]}.`
    );
}

const command = new Command({
    name: 'mutedrole', 
    description: 'Sets the mute role.', 
    category: 'Utility',
    permissions: ['ADMINISTRATOR'],
    exeFunc: execute
})

export = command;