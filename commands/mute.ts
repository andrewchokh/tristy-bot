import { CommandInteraction, GuildMember, Message, MessageEmbed } from 'discord.js';
import Command from '../class/command';
import guildModel from '../models/guild';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {
    const member = message.mentions.members?.first();

    if (!member) return await message.channel.send(
        await client.getLine(message.guild, "MUTE_FAIL_NOMEMBER")
    );

    const guildDB = await guildModel.findOne({id: message.guildId}).exec();

    const mutedRoleId = guildDB['mutedrole'];

    const mutedRole = message.guild?.roles.cache.get(mutedRoleId) 

    if (!mutedRole) return await message.channel.send(
        await client.getLine(message.guild, "MUTE_FAIL_NOMUTEDROLE")
    );

    await member.roles.add(mutedRole);

    const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setTitle('MUTE')
        .setDescription(`Member ${args[0]} has been muted.`)
        .setFields([
            {
                name: 'Reason',
                value: args[1] || 'Not specified.',
                inline: true
            },
            // {
            //     name: 'Time',
            //     value: args[2] || 'Not specified.',
            //     inline: true
            // },
        ])

    await message.channel.send({embeds: [embed]});  

    // if (args.length > 2) {
    //     const time = parseInt(args[2]);

    //     if (!time) return;

    //     setTimeout(async () => {
    //         (await member).roles.remove(mutedRole);
    //     }, time * 1000);
    // }
}

async function executeSlash(
    client: DiscordBot,
    interaction: CommandInteraction, 
    args: string[]
) {
    const member = interaction.options.getMentionable('member') as GuildMember;
    const reason = interaction.options.getString('reason');

    const guildDB = await guildModel.findOne({id: interaction.guildId}).exec();
    const mutedRoleId = guildDB['mutedrole'];
    const mutedRole = interaction.guild?.roles.cache.get(mutedRoleId) 

    if (!mutedRole) return await interaction.reply(
        await client.getLine(interaction.guild, "MUTE_FAIL_NOMUTEDROLE")
    );

    await member.roles.add(mutedRole);

    const reasonLine = client.getLine(interaction.guild, "REASON");
    const notSpecifiedLine = client.getLine(interaction.guild, "NOTSPECIFIED");
    const embedDescription = client.getLine(interaction.guild, "MUTE_SUCCESS");

    const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setTitle('MUTE')
        .setDescription(
            embedDescription.replace('%MEMBER%', `<@${member.id}>`)
        )
        .setFields([
            {
                name: 'Reason',
                value: reasonLine || notSpecifiedLine,
                inline: true
            },
            
        ])

    await interaction.reply({embeds: [embed]})    
}

const command = new Command({
    name: 'mute', 
    description: 'Mutes a member.', 
    category: 'Moderation',
    permissions: ['MUTE_MEMBERS'],
    exeFunc: execute,
    slash: {
        testing: true,
        options: [
            {
                name: 'member',
                type: 9,
                required: true,
                description: 'Member to mute.'
            },
            {
                name: 'reason',
                type: 3,
                required: false,
                description: 'Reason of mute.'
            }
        ],
        exeFunc: executeSlash
    }
})

export = command;