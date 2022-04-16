import mongoose from "mongoose";
import DiscordBot from "../source/DiscordBot";

export = async (client: DiscordBot) => {
    try {
        await mongoose.connect(client.botConfig.mongoUri)
        .then(() => {
            client.logger.log("Successfully connected to MongoDB");
        });  
    } catch(err) {
        throw err;
    }    
}