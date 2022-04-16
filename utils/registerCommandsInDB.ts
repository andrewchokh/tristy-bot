import DiscordBot from '../source/DiscordBot';
import guildModel from '../models/guild';
import commandModel from '../models/command';
import Command from '../class/command';

export = async (client: DiscordBot) => {
    const guildsDB = await guildModel.find().exec();

    guildsDB.forEach((guildDB) => {
        client.commands.forEach(async (command: Command) => {
            if (!(await commandModel.exists({
                name: command.name, guildId: guildDB['id']
            }))) {
                await new commandModel({
                    name: command.name,
                    guildid: guildDB['id'],
                    status: true,
                    requiredchannels: [],
                    blacklistedchannels: [],
                    requiredroles: [],
                    blacklistedroles: [],
                    redirectedoutput: '',
                    modonly: false
                }).save();

                client.logger.log('Command Added To Database: ' + command.name);
            }
        });
    })
}