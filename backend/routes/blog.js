const express = require('express');
const { body } = require('express-validator');
const blogController = require('../controllers/blogController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', blogController.getAllPublished);

router.get('/:slug', blogController.getBySlug);

router.post('/', verifyToken, [
  body('title').notEmpty().trim(),
  body('slug').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('excerpt').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('readTime').notEmpty().trim()
], blogController.create);

router.put('/:id', verifyToken, [
  body('title').notEmpty().trim(),
  body('slug').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('excerpt').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('readTime').notEmpty().trim(),
  body('isPublished').isBoolean()
], blogController.update);

router.delete('/:id', verifyToken, blogController.deleteBlog);

router.get('/admin/all', verifyToken, blogController.getAllAdmin);

module.exports = router;
