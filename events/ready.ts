export = async (client: any) => {
        client.user.setPresence({
        status: client.botConfig.presence.status,
        activity: {
            name: client.botConfig.presence.name,
            type: client.botConfig.presence.type,
        },
    });

    client.registerSlashCommands();
    client.logger.log("Successfully Logged in as " + client.user.tag);
};