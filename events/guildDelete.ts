import guildsModel from '../models/guild';

export = async (client: any, guild: any) => {
    await guildsModel.deleteOne({id: String(guild.id)})
    .then(() => {
        client.logger.log("Bot has left to the server: " + guild.name);
    });
}