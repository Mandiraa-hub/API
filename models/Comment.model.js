const mongoose = require('mongoose');


// Define the Comment Schema
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog', // Reference to the Blog model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Comment model
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
