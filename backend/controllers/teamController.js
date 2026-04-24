const { validationResult } = require('express-validator');
const queries = require('../models/queries');

const getAll = async (req, res, next) => {
  try {
    const result = await queries.getAllActiveTeamMembers();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      team: result.rows
    });
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const result = await queries.getAllTeamMembers();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      team: result.rows
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

    const { name, title, bio, phone, whatsapp, email, initials, displayOrder } = req.body;

    const result = await queries.createTeamMember(name, title, bio, phone || '', whatsapp || '', email || '', initials, displayOrder || 0);

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      member: result.rows[0]
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
    const { name, title, bio, phone, whatsapp, email, initials, isActive, displayOrder } = req.body;

    const memberExists = await queries.getTeamMemberById(id);
    if (memberExists.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    const result = await queries.updateTeamMember(id, name, title, bio, phone || '', whatsapp || '', email || '', initials, isActive !== undefined ? isActive : true, displayOrder || 0);

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      member: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    const memberExists = await queries.getTeamMemberById(id);
    if (memberExists.rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    await queries.deleteTeamMember(id);

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
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
  deleteTeam
};
