const { validationResult } = require('express-validator');
const queries = require('../models/queries');

const getAll = async (req, res, next) => {
  try {
    const result = await queries.getAllActiveClients();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      clients: result.rows
    });
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const result = await queries.getAllClients();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      clients: result.rows
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

    const { name, initials, industry, displayOrder } = req.body;

    const result = await queries.createClient(name, initials, industry, displayOrder || 0);

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      client: result.rows[0]
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
    const { name, initials, industry, isActive, displayOrder } = req.body;

    const clientExists = await queries.getClientById(id);
    if (clientExists.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const result = await queries.updateClient(id, name, initials, industry, isActive !== undefined ? isActive : true, displayOrder || 0);

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      client: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const clientExists = await queries.getClientById(id);
    if (clientExists.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await queries.deleteClient(id);

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getAllAdmin,
  create,
  update,
  deleteClient
};
