const express = require('express');
const { body } = require('express-validator');
const clientsController = require('../controllers/clientsController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', clientsController.getAll);

router.get('/admin/all', verifyToken, clientsController.getAllAdmin);

router.post('/admin/create', verifyToken, [
  body('name').notEmpty().trim(),
  body('initials').notEmpty().trim().isLength({ min: 1, max: 5 }),
  body('industry').notEmpty().trim(),
  body('displayOrder').isInt()
], clientsController.create);

router.put('/admin/:id', verifyToken, [
  body('name').notEmpty().trim(),
  body('initials').notEmpty().trim(),
  body('industry').notEmpty().trim(),
  body('isActive').isBoolean(),
  body('displayOrder').isInt()
], clientsController.update);

router.delete('/admin/:id', verifyToken, clientsController.deleteClient);

module.exports = router;
