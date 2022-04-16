import { CommandInteraction, Message } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    const amount = parseInt(args[0]);

    if (!amount) return await message.channel.send(
        await client.getLine(message.guild, "PURGE_FAIL_INVALID_AMOUNT")
    );
    if (amount > 100) return await message.channel.send(
        await client.getLine(message.guild, "PURGE_FAIL_BIG_AMOUNT")
        );
    if (message.channel.type === "DM") return;
    
    message.channel.bulkDelete(amount+1);

    let text = await client.getLine(message.guild, "PURGE_SUCCESS_MESSAGE");

    const msg = await message.channel.send(text.replace('%AMOUNT%', amount));
    setTimeout(() => {
        msg.delete();
    }, 3000)
}

async function executeSlash(
    client: DiscordBot,
    interaction: CommandInteraction, 
    args: string[]
) {
    const amount = interaction.options.getInteger('amount'); 

    if (!amount) return await interaction.reply(
        await client.getLine(interaction.guild, "PURGE_FAIL_INVALID_AMOUNT")
    );
    if (amount > 100 || amount < 1) return await interaction.reply(
        await client.getLine(interaction.guild, "PURGE_FAIL_BIG_AMOUNT")
    )
    if (interaction.channel?.type === "DM") return;

    interaction.channel?.bulkDelete(amount); 

    let text = await client.getLine(interaction.guild, "PURGE_SUCCESS_MESSAGE");

    await interaction.reply(text.replace('%AMOUNT%', amount));   
    setTimeout(() => {
        interaction.deleteReply();
    }, 3000)
}

const command = new Command({
    name: 'purge', 
    description: 'Deletes amount of messages in the channel.', 
    category: 'Moderation',
    aliases: ['clear', 'cls'],
    permissions: ['MANAGE_MESSAGES'],
    exeFunc: execute,
    slash: {
        testing: true,
        options: [
            {
                name: 'amount',
                type: 4,
                required: true,
                description: 'Amount of messages.'
            }
        ],
        exeFunc: executeSlash
    }
})

export = command;