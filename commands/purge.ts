import { CommandInteraction, Message } from 'discord.js';
import DiscordBot from '../source/DiscordBot';

export = {
	name: "purge",
	description: "Deletes amount of messages in the channel.",
	category: 'Moderation',
	permissions: ["MANAGE_MESSAGES"],
	aliases: ['clear'],

	run: async (client: DiscordBot, message: Message, args: string[]) => {
		const amount = parseInt(args[0]);

        if (!amount) return message.channel.send("Please specify the amount of messages you want me to delete");
        if (amount > 100 || amount < 1) return message.channel.send("Please select a number *between* 100 and 1");

        if (message.channel.type === "DM") return;
        
        message.channel.bulkDelete(amount+1)
            .catch((err: any) => {
                message.channel.send(':x: Due to Discord Limitations, I cannot delete messages older than 14 days') 
            });

        const msg = await message.channel.send(`Deleted **${amount}** messages.`);

        setTimeout(() => {
            msg.delete();
        }, 3000)
	},

	slash: {
		test: true,
		options: [
            {
                name: 'amount',
                type: 4,
                required: true,
                description: 'Amount of messages.'
            }
        ],

		run: async (client: DiscordBot, interaction: CommandInteraction, args: string[]) => {
			const amount = interaction.options.getInteger('amount');   

            if (!amount) return interaction.reply("Please specify the amount of messages you want me to delete");
            if (amount > 100 || amount < 1) return interaction.reply("Please select a number *between* 100 and 1");

            if (interaction.channel?.type === "DM") return;

            interaction.channel?.bulkDelete(amount).catch((err: any) => {
                interaction.reply(':x: Due to Discord Limitations, I cannot delete messages older than 14 days') })

            await interaction.reply(`Deleted **${amount}** messages.`);   
            
            setTimeout(() => {
                interaction.deleteReply();
            }, 3000)
		}
	}
}