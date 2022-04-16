import { Guild } from "discord.js";
import DiscordBot from "../source/DiscordBot";
import guildModel from "../models/guild";

export = async (
    client: DiscordBot, 
    guild: Guild | null, 
    line: string
): Promise<string | undefined> => {
    if (!guild) return;

    const guildDB = await guildModel.findOne({id: String(guild.id)}).exec();

    if (!guildDB) return;

    const language = client.languages.get(guildDB['language']);

    if (!language) return;

    return language[line];
}