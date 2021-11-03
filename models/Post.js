const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    modifiedAt: {
        type: Date
    },
    genre: {
        type: Array
    },
    image: {
        type: String
    }
})

const User = mongoose.model('Post', postSchema)

module.exports = {User}