import DiscordBot from "../source/DiscordBot";
import { CommandInteraction } from "discord.js";

export = async (client: DiscordBot, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;

    const {commandName, options} = interaction;

    const command = client.commands.get(commandName);

    if (command.slash && command.slash.run)
        command.slash.run(this, interaction, options);
}