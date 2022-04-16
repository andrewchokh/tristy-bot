import { CommandInteraction, Message, MessageEmbed } from 'discord.js';
import Command from '../class/command';
import DiscordBot from '../source/DiscordBot';

async function execute(
    client: DiscordBot,
    message: Message, 
    args: string[]
) {

    let mentions = message.mentions.users

    if (!mentions) return await message.channel.send(
        client.getLine(message.guild, 'AVATAR_FAIL_NO_MEMBER')
    );    

    message.guild?.members.fetch().then(members => {
        members.forEach(async (member) => {
            if (member.user === mentions.get(String(member.id))) {
                const avatarUrl = member.user.avatarURL()

                if (!avatarUrl) return await message.channel.send(
                    client.getLine(message.guild, 'AVATAR_FAIL_NO_AVATAR')
                ); 

                const embed = new MessageEmbed()
                    .setColor(0x333333)
                    .setAuthor({name: member.user.username})
                    .setImage(String(avatarUrl))

                return await message.channel.send({embeds: [embed]});
            }
        })
    })
}

const command = new Command({
    name: 'avatar', 
    description: 'Sends the member\'s avatar.', 
    category: 'Utility',
    aliases: [],
    exeFunc: execute,
})

export = command;