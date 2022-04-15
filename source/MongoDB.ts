import mongoose from "mongoose";
import Logger from "./Logger";
import path from "path";

class MongoDB {
    logger: Logger;

    constructor(uri: any) {
        this.connect(uri)
        this.logger = new Logger(path.join(__dirname, "..", "Logs.log"));
    }

    log (info: any) {
        this.logger.log(info);
    }

    async connect(uri: any) {
        try {
            await mongoose.connect(uri)
            .then(() => {
                this.logger.log("Successfully connected to MongoDB");
            });  
        } catch(e) {
            this.logger.error("Unable to connect to MongoDB. Reason: " + e);
        }    
    }
}

export = MongoDB