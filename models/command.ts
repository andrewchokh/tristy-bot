import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { // Name of a command
        type: String,
        required: true
    },
    guildid: { // Server ID where this config is used
        type: String,
        required: true
    },
    status: { // Status of a command. TRUE: on, FALSE: off
        type: Boolean,
        required: true
    },
    requiredchannels: { // Channels where you can use a command
        type: Array,
        required: false
    },
    blacklistedchannels: { // Channels where you can't use a command
        type: Array,
        required: false
    },
    requiredroles: { // Required users roles for use a command
        type: Array,
        required: false
    },
    blacklistedroles: { // Users roles that can't use a command
        type: Array,
        required: false 
    },
    redirectedoutput: { // Redirect output of a comamnd in the set channel
        type: String,
        required: false
    },
    modonly: { // Only mods can use a command
        type: Boolean,
        required: false
    }
})

export = mongoose.model('command', schema, 'commands')