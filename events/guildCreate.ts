import { Guild } from 'discord.js';
import guildsModel from '../models/guild';
import DiscordBot from '../source/DiscordBot';

export = async (client: DiscordBot, guild: Guild) => {
    await new guildsModel({
        id: guild.id,
        prefix: null,
        language: "english",
        logchannel: null,
        botchannels: [],
        mutedrole: null,
        blacklistedchannels: [],
        blacklistedroles: []
    })
    .save()
    .then(() => {
        client.logger.log("Bot has joined to the server: " + guild.name);
    });

    await client.registerCommandsInDB();
}