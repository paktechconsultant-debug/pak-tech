const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const queries = require('../models/queries');

const initializeDefaultAdmin = async () => {
  try {
    const result = await queries.getAdminByEmail('paktechconsultants@gmail.com');

    if (result.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('paktech@admin2025', 10);
      await pool.query(
        'INSERT INTO admins (username, email, password) VALUES ($1, $2, $3)',
        ['admin', 'paktechconsultants@gmail.com', hashedPassword]
      );
      console.log('✓ Default admin created with email: paktechconsultants@gmail.com');
    } else {
      const adminRecord = result.rows[0];
      const isDefaultPassword = adminRecord.password === '$2b$10$placeholder_will_be_replaced';

      if (isDefaultPassword) {
        const hashedPassword = await bcrypt.hash('paktech@admin2025', 10);
        await pool.query('UPDATE admins SET password = $1 WHERE id = $2', [hashedPassword, adminRecord.id]);
        console.log('✓ Default admin password updated');
      }
    }
  } catch (err) {
    console.error('Error initializing default admin:', err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await queries.getAdminByEmail(email);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const verify = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

module.exports = {
  login,
  logout,
  verify,
  initializeDefaultAdmin
};
