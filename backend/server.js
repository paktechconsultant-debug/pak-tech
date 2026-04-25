const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const clientsRoutes = require('./routes/clients');
const teamRoutes = require('./routes/team');
const errorHandler = require('./middleware/errorHandler');
const { initializeDefaultAdmin } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://pak-tech.vercel.app', 'https://pak-tech-kn703gs81-paktechconsultant-debugs-projects.vercel.app', 'http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/team', teamRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Pak-Tech Backend is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✓ Pak-Tech Backend Server running on port ${PORT}`);
  initializeDefaultAdmin();
});
