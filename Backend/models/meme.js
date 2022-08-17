const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    comments: [
        {
            body: String,
            date: Date
        }
    ],
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Meme', memeSchema);