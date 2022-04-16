import { Channel, GuildMember, Role } from 'discord.js';
import guildModel from '../models/guild';
import commandModel from '../models/command'
import Command from '../class/command';

export = async (command: Command, member: GuildMember, channel: Channel) => {
    const guildDB = await guildModel.findOne({id: String(member.guild.id)}).exec();
    const commandDB = await commandModel.findOne({name: command.name}).exec();

    if (!guildDB || !commandDB) return true;

    if (
        (!member.permissions
            .has(command.permissions)) ||
        (member.roles.cache
            .some(role => guildDB['blacklistedroles']
                .includes(role))) ||
        ((!member.roles.cache
            .some(role => commandDB['requiredroles']
            .includes(role)) && 
        commandDB['requiredroles'].length)) ||
        (member.roles.cache
            .some(role => commandDB['blacklistedroles']
            .includes(role))) ||
        (commandDB['modonly'] && 
        !member.permissions.has('ADMINISTRATOR')) ||
        (guildDB['botchannels'].length && 
        !guildDB['botchannels']
            .includes(channel)) ||
        (guildDB['blacklistedchannels'].length && 
        guildDB['blacklistedchannels']
            .includes(channel)) ||
        (commandDB['requiredchannels'].length && 
        !commandDB['requiredchannels']
            .includes(channel)) ||
        (commandDB['blacklistedchannels'].length && 
        commandDB['blacklistedchannels']
            .includes(channel)) ||
        (!commandDB['status'])
    ) return false;

    return true;
}