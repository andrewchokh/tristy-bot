import { Channel, GuildMember } from 'discord.js';
import guildModel from '../models/guild';

export = async (command: any, member: GuildMember, channel: Channel) => {
    const guildDB = await guildModel.findOne({id: String(member.guild.id)}).exec();
    const commandDB = await guildModel.findOne({name: command.name}).exec();

    if (!guildDB.length || !commandDB.length) return true;

    if (
        (member.permissions
            .has(command.permissions) && 
        !member.permissions
            .has(guildDB['blacklistedroles']) &&
        member.permissions
            .has(commandDB['requiredroles']) &&
        !member.permissions
            .has(commandDB['blacklistedroles'])) &&
        (commandDB['modonly'] &&
        member.permissions
            .has('ADMINISTRATOR')) &&
        ((guildDB['botchannels'].length &&
        guildDB['botchannels']
            .includes(channel)) &&
        !guildDB['blacklistedchannels']
            .includes(channel) &&
        (commandDB['requiredchannels'].length &&
        commandDB['requiredchannels']
            .includes(channel)) &&
        !commandDB['blacklistedchannels']
            .includes(channel)) &&
        commandDB['status']
    ) return true;

    else return false;

}