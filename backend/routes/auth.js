const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', [
  body('email').isEmail().trim(),
  body('password').notEmpty()
], authController.login);

router.post('/logout', verifyToken, authController.logout);

router.get('/verify', verifyToken, authController.verify);

module.exports = router;
