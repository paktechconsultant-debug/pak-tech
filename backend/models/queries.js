const pool = require('../config/db');

// Admin queries
const getAdminByEmail = (email) => {
  return pool.query('SELECT * FROM admins WHERE email = $1', [email]);
};

const getAdminById = (id) => {
  return pool.query('SELECT id, username, email, created_at FROM admins WHERE id = $1', [id]);
};

const updateAdminPassword = (id, hashedPassword) => {
  return pool.query('UPDATE admins SET password = $1 WHERE id = $1', [hashedPassword, id]);
};

// Blog queries
const getAllBlogPosts = () => {
  return pool.query('SELECT * FROM blog_posts WHERE is_published = true ORDER BY created_at DESC');
};

const getAllBlogPostsAdmin = () => {
  return pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
};

const getBlogPostBySlug = (slug) => {
  return pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND is_published = true', [slug]);
};

const getBlogPostById = (id) => {
  return pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
};

const createBlogPost = (title, slug, category, excerpt, content, readTime) => {
  return pool.query(
    'INSERT INTO blog_posts (title, slug, category, excerpt, content, read_time, is_published) VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING *',
    [title, slug, category, excerpt, content, readTime]
  );
};

const updateBlogPost = (id, title, slug, category, excerpt, content, readTime, isPublished) => {
  return pool.query(
    'UPDATE blog_posts SET title = $1, slug = $2, category = $3, excerpt = $4, content = $5, read_time = $6, is_published = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
    [title, slug, category, excerpt, content, readTime, isPublished, id]
  );
};

const deleteBlogPost = (id) => {
  return pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
};

// Contact queries
const submitContactForm = (name, email, message) => {
  return pool.query(
    'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
    [name, email, message]
  );
};

const getAllContactSubmissions = () => {
  return pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
};

const getContactSubmissionById = (id) => {
  return pool.query('SELECT * FROM contact_submissions WHERE id = $1', [id]);
};

const markContactAsRead = (id) => {
  return pool.query('UPDATE contact_submissions SET is_read = true WHERE id = $1 RETURNING *', [id]);
};

const deleteContactSubmission = (id) => {
  return pool.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
};

// Clients queries
const getAllActiveClients = () => {
  return pool.query('SELECT * FROM clients WHERE is_active = true ORDER BY display_order ASC');
};

const getAllClients = () => {
  return pool.query('SELECT * FROM clients ORDER BY display_order ASC');
};

const getClientById = (id) => {
  return pool.query('SELECT * FROM clients WHERE id = $1', [id]);
};

const createClient = (name, initials, industry, displayOrder) => {
  return pool.query(
    'INSERT INTO clients (name, initials, industry, display_order, is_active) VALUES ($1, $2, $3, $4, true) RETURNING *',
    [name, initials, industry, displayOrder]
  );
};

const updateClient = (id, name, initials, industry, isActive, displayOrder) => {
  return pool.query(
    'UPDATE clients SET name = $1, initials = $2, industry = $3, is_active = $4, display_order = $5 WHERE id = $6 RETURNING *',
    [name, initials, industry, isActive, displayOrder, id]
  );
};

const deleteClient = (id) => {
  return pool.query('DELETE FROM clients WHERE id = $1', [id]);
};

// Team queries
const getAllActiveTeamMembers = () => {
  return pool.query('SELECT * FROM team_members WHERE is_active = true ORDER BY display_order ASC');
};

const getAllTeamMembers = () => {
  return pool.query('SELECT * FROM team_members ORDER BY display_order ASC');
};

const getTeamMemberById = (id) => {
  return pool.query('SELECT * FROM team_members WHERE id = $1', [id]);
};

const createTeamMember = (name, title, bio, phone, whatsapp, email, initials, displayOrder) => {
  return pool.query(
    'INSERT INTO team_members (name, title, bio, phone, whatsapp, email, initials, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true) RETURNING *',
    [name, title, bio, phone, whatsapp, email, initials, displayOrder]
  );
};

const updateTeamMember = (id, name, title, bio, phone, whatsapp, email, initials, isActive, displayOrder) => {
  return pool.query(
    'UPDATE team_members SET name = $1, title = $2, bio = $3, phone = $4, whatsapp = $5, email = $6, initials = $7, is_active = $8, display_order = $9 WHERE id = $10 RETURNING *',
    [name, title, bio, phone, whatsapp, email, initials, isActive, displayOrder, id]
  );
};

const deleteTeamMember = (id) => {
  return pool.query('DELETE FROM team_members WHERE id = $1', [id]);
};

module.exports = {
  getAdminByEmail,
  getAdminById,
  updateAdminPassword,
  getAllBlogPosts,
  getAllBlogPostsAdmin,
  getBlogPostBySlug,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  markContactAsRead,
  deleteContactSubmission,
  getAllActiveClients,
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getAllActiveTeamMembers,
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
