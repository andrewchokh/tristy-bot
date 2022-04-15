import dotenv from 'dotenv';

dotenv.config();

export = {
    ownerId: '538494819664789544', // ID of the bot owner
    clientId: '832665697900560416', // Discord client ID 
    token: process.env.TOKEN || null, // Bot's token
    mongoUri: process.env.MONGO_URI || null, // URI link to MongoDB
    intents: 131071, // Intents for the bot
    defaultPrefix: '>', // Default prefix for bot commands
    defaultLanguage: 'english', // Default language of bot
    testingServerId: '831960677949505556', // Server for test of slash commands
    presence: {
        status: 'online', // online, idle, dnd
        name: '>help', // The message shown
        type: 'WATCHING', // PLAYING, WATCHING, LISTENING, STREAMING
    },
}