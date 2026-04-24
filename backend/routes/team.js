const express = require('express');
const { body } = require('express-validator');
const teamController = require('../controllers/teamController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', teamController.getAll);

router.get('/admin/all', verifyToken, teamController.getAllAdmin);

router.post('/admin/create', verifyToken, [
  body('name').notEmpty().trim(),
  body('title').notEmpty().trim(),
  body('bio').notEmpty().trim(),
  body('initials').notEmpty().trim(),
  body('displayOrder').isInt()
], teamController.create);

router.put('/admin/:id', verifyToken, [
  body('name').notEmpty().trim(),
  body('title').notEmpty().trim(),
  body('bio').notEmpty().trim(),
  body('initials').notEmpty().trim(),
  body('isActive').isBoolean(),
  body('displayOrder').isInt()
], teamController.update);

router.delete('/admin/:id', verifyToken, teamController.deleteTeam);

module.exports = router;
