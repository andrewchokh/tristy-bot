import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    }    
})

export = mongoose.model('user', schema, 'users')