import { CommandInteraction, Message } from 'discord.js';
import DiscordBot from '../source/DiscordBot';

export = {
	name: "ping",
	description: "Shows the ping.",
	category: 'Moderation',
	permissions: [],
	aliases: ['pi'],

	run: async (client: DiscordBot, message: Message, args: {}) => {
		return message.reply(`Ping: ${Math.round(client.ws.ping)}ms`);
	},

	slash: {
		test: true,
		options: [],

		run: async (client: DiscordBot, interaction: CommandInteraction, args: {}) => {
			const message = await interaction.reply({content: 'Pong!', fetchReply: true});

			await interaction.editReply(`Pong!\nWebsocket Latency: 5ms`)
		}
	}
}
