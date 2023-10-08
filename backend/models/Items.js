import mongoose from "mongoose";

const items = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        provisional: String,
        sprite: String,
        full: String,
        x: Number,
        y: Number,
        w: Number,
        h: Number
    }
});

export default mongoose.model('items', items)