import DiscordBot from "../source/DiscordBot";
import { CommandInteraction, GuildMember } from "discord.js";

export = async (client: DiscordBot, interaction: CommandInteraction) => {
    if (!interaction.isCommand() || !interaction.member) return;

    const {commandName, options, member, channel} = interaction;

    const command = client.commands.get(commandName);

    if (!command.slash) return;;

    command.executeSlash(client, interaction, options);
}