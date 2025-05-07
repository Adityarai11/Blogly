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
    image: {
        type: String // URL or file path
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'user id is require']
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
