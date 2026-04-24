# Pak-Tech Backend API

Complete Node.js + Express + PostgreSQL backend for Pak-Tech Engineering Consultant website.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
Create PostgreSQL database:
```sql
CREATE DATABASE paktech_db;
```

Then run the SQL schema:
```bash
psql -U postgres -d paktech_db -f models/db.sql
```

### 3. Environment Configuration
Update `.env` file with your values:
```
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/paktech_db
JWT_SECRET=paktech_super_secret_jwt_key_2025
EMAIL_USER=paktechconsultants@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=paktechconsultants@gmail.com
```

For Gmail, use an App Password (not your regular password):
1. Enable 2FA on Google Account
2. Create App Password at https://myaccount.google.com/apppasswords
3. Use that password in EMAIL_PASS

### 4. Start Server
```bash
npm start          # Production
npm run dev        # Development (with nodemon)
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password, get JWT token
- `POST /api/auth/logout` - Logout (protected)
- `GET /api/auth/verify` - Verify token validity (protected)

### Blog
- `GET /api/blog` - Get all published posts
- `GET /api/blog/:slug` - Get single post by slug
- `POST /api/blog` - Create post (protected)
- `PUT /api/blog/:id` - Update post (protected)
- `DELETE /api/blog/:id` - Delete post (protected)
- `GET /api/blog/admin/all` - Get all posts including unpublished (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/admin/all` - Get all submissions (protected)
- `PUT /api/contact/admin/:id/read` - Mark as read (protected)
- `DELETE /api/contact/admin/:id` - Delete submission (protected)

### Clients
- `GET /api/clients` - Get all active clients
- `GET /api/clients/admin/all` - Get all clients (protected)
- `POST /api/clients/admin/create` - Create client (protected)
- `PUT /api/clients/admin/:id` - Update client (protected)
- `DELETE /api/clients/admin/:id` - Delete client (protected)

### Team
- `GET /api/team` - Get all active team members
- `GET /api/team/admin/all` - Get all team members (protected)
- `POST /api/team/admin/create` - Create member (protected)
- `PUT /api/team/admin/:id` - Update member (protected)
- `DELETE /api/team/admin/:id` - Delete member (protected)

## Default Admin
- **Email**: paktechconsultants@gmail.com
- **Password**: paktech@admin2025

## Authentication
Include JWT token in headers:
```
Authorization: Bearer <your_token>
```

## Health Check
```
GET /api/health
```

## Database Tables
- `admins` - Admin users
- `blog_posts` - Blog articles
- `contact_submissions` - Contact form submissions
- `clients` - Client companies
- `team_members` - Team members

## Features
✓ JWT authentication
✓ Password hashing with bcrypt
✓ Email notifications (nodemailer)
✓ Input validation with express-validator
✓ SQL injection protection (parameterized queries)
✓ CORS enabled for frontend
✓ Error handling middleware
✓ Automatic default admin initialization

## CORS Configuration
Frontend allowed origins:
- http://localhost:5500
- http://127.0.0.1:5500

## Notes
- All protected routes require valid JWT token
- All responses are JSON format
- HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)
- Database uses parameterized queries to prevent SQL injection
- Passwords are hashed with bcrypt before storage
