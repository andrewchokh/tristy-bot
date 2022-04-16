import { Role } from "discord.js";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: { // ID of a server
        type: String,
        required: true
    },
    prefix: { // Prefix for comamnds
        type: String,
        required: false
    },
    language: { // Bot language on a server
        type: String,
        required: true
    },
    logchannel: { // Logging channel of a server
        type: String,
        required: false
    },
    botchannels: { // Channels bot can see
        type: Array,
        required: false
    },
    mutedrole: { // "Muted" role of a server
        type: String,
        required: false
    },
    blacklistedchannels: { // Channels bot can't see
        type: Array,
        required: false
    },
    blacklistedroles: { // Users with roles bot can't see
        type: Array,
        required: false
    }
})

export = mongoose.model('guild', schema, 'guilds')