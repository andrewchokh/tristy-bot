import DiscordBot from "./source/DiscordBot";
import botConfig from "./botconfig";

const client = new DiscordBot({
    intents: botConfig.intents
});

client.build();

export = client;