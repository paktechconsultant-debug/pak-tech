const { validationResult } = require('express-validator');
const queries = require('../models/queries');

const getAllPublished = async (req, res, next) => {
  try {
    const result = await queries.getAllBlogPosts();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      posts: result.rows
    });
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await queries.getBlogPostBySlug(slug);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json({
      success: true,
      post: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, slug, category, excerpt, content, readTime } = req.body;

    const result = await queries.createBlogPost(title, slug, category, excerpt, content, readTime);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, slug, category, excerpt, content, readTime, isPublished } = req.body;

    const postExists = await queries.getBlogPostById(id);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const result = await queries.updateBlogPost(id, title, slug, category, excerpt, content, readTime, isPublished);

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      post: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postExists = await queries.getBlogPostById(id);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await queries.deleteBlogPost(id);

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const result = await queries.getAllBlogPostsAdmin();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      posts: result.rows
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPublished,
  getBySlug,
  create,
  update,
  deleteBlog,
  getAllAdmin
};
