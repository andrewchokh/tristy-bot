import { CommandInteraction, Message } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    const amount = parseInt(args[0]);

    if (!amount) return message.channel.send("Please specify the amount of messages you want me to delete");
    if (amount > 100 || amount < 1) return message.channel.send("Please select a number *between* 100 and 1");
    if (message.channel.type === "DM") return;
    
    message.channel.bulkDelete(amount+1)
        .catch((err: any) => {
            console.log(err);
        });

    const msg = await message.channel.send(`Deleted **${amount}** messages.`);
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

    if ((!amount) || (amount > 100 || amount < 1)) return;
    if (interaction.channel?.type === "DM") return;

    interaction.channel?.bulkDelete(amount)  

    await interaction.reply(`Deleted **${amount}** messages.`);   
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
        enable: true,
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