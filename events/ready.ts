import DiscordBot from "../source/DiscordBot";

export = async (client: DiscordBot) => {
    // client.user.setPresence({
    //     status: client.botConfig.presence.status,
    //     activity: {
    //         name: client.botConfig.presence.name,
    //         type: client.botConfig.presence.type,
    //     },
    // });
    
    client.connectDB();
    client.registerCommandsInDB();
    client.registerSlashCommands();

    client.logger.log("Successfully Logged in as " + client.user?.tag);
};