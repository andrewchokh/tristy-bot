import guildsModel from '../models/guild';

export = async (client: any, guild: any) => {
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
}