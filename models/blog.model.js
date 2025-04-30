const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'title is required'],
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String // URL or file path
    },
    likes: {
        type: Number,
        default: 0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'user id is require']
    },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
