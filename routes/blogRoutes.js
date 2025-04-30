const express = require('express');
const { getAllBlogsController, createBlogsController, updateBlogsController, getBlogsIdController, deleteBlogsController, userBlogController } = require('../controllers/blogController');
const router = express.Router();

// Get all blog posts
router.get('/all-blog', getAllBlogsController);

// Create a new blog post
router.post('/create-blog',  createBlogsController);

// Update a blog post by ID
router.put('/update-blog/:id', updateBlogsController);

// Get a single blog post by ID
router.get('/get-blog/:id', getBlogsIdController);

// Delete a blog post by ID
router.delete('/delete-blog/:id', deleteBlogsController);

//Get || user blog 
router.get('/user-blog/:id', userBlogController);


module.exports = router;


