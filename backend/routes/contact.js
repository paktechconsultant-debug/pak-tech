const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', [
  body('name').notEmpty().trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('message').notEmpty().trim().isLength({ min: 10 })
], contactController.submitContact);

router.get('/admin/all', verifyToken, contactController.getAll);

router.put('/admin/:id/read', verifyToken, contactController.markRead);

router.delete('/admin/:id', verifyToken, contactController.deleteSubmission);

module.exports = router;
