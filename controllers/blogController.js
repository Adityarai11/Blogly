const mongoose = require('mongoose');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');

// Get all blog posts
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find().populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No Blogs Found'
            })
        }
        return res.status(200).send({
            blogCounts: blogs.length,
            success: true,
            message: 'All blogs fetched successfully',
            blogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching blogs',
            error
        });
    }
};

// Create a new blog post
exports.createBlogsController = async (req, res) => {
    try {
        const { title, content,  image, user } = req.body;

        // Basic validation
        if (!title || !content || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Field'
            });
        }
        const exisitingUser = await userModel.findById(user)
        //validiation
        if (!exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "invalid user"
            })
        }

        const newBlog = new blogModel({ title, content, image, user });
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog)
        await exisitingUser.save({ session });
        await session.commitTransaction()
        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: 'Blog created successfully',
            blog: newBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating blog',
            error
        });
    }
};

// Get a single blog post by ID
exports.getBlogsIdController = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id).populate('user', 'username email'); 

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
        res.status(200).send({
            success: true,
            blog
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching blog by ID',
            error
        });
    }
};

// Update a blog post by ID
exports.updateBlogsController = async (req, res) => {
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Blog updated successfully',
            blog: updatedBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating blog',
            error
        });
    }
};

// Delete a blog post by ID
exports.deleteBlogsController = async (req, res) => {
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        if (!deletedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
        await deletedBlog.user.blogs.pull(deletedBlog)
        await deletedBlog.user.save()

        res.status(200).send({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting blog',
            error
        });
    }
};
// Get USER Blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlogs = await userModel.findById(req.params.id).populate('blogs');

        if (!userBlogs) {
            return res.status(404).send({
                success: false,
                message: 'No blogs found for this user'
            });
        }

        res.status(200).send({
            success: true,
            message: 'User blogs fetched successfully',
            blogs: userBlogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching user blogs',
            error
        });
    }
};
