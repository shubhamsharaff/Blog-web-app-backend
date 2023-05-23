const express = require('express');
const router = express.Router();
const Blog = require('../model/blog')

router.get('/home',(req,res)=>{
    return res.send("hiiiii")
})

// Create a new blog
router.post('/createBlog', async (req, res) => {
    try {
      const { title, body } = req.body;
      const blog = new Blog({ title, body });
      const savedBlog = await blog.save();
      return res.status(201).json(savedBlog);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create a blog' });
    }
  });
  
  // Get all blogs
  router.get('/getAllBlogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      return res.json(blogs);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  });
  
  // Get a specific blog
  router.get('/getBlogById/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      return res.json(blog);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch the blog' });
    }
  });
  
  // Update a blog
  router.put('/updateBlogById/:id', async (req, res) => {
    try {
      const { title, body } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      return res.json(updatedBlog);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update the blog' });
    }
  });
  
  // Replace a blog
  router.put('/:id/replace', async (req, res) => {
    try {
      const { title, body } = req.body;
      const blog = new Blog({ title, body });
      const replacedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
      if (!replacedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      returnres.json(replacedBlog);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to replace the blog' });
    }
  });
  
  // Delete a blog
  router.delete('/deleteBlogById/:id', async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      return res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete the blog' });
    }
  });
  
  module.exports = router;