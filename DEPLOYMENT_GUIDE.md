# Pak-Tech Auto-Deployment Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- GitHub Account (free)
- Railway Account (free tier available)
- Git installed on your computer

---

## 📋 Step-by-Step Deployment

### **Step 1: Push Code to GitHub**

#### 1.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `pak-tech`
3. Description: "Pak-Tech Engineering Consultant Website"
4. Click **"Create repository"**

#### 1.2 Push Code Locally
```bash
# Navigate to project folder
cd C:\Users\awais\OneDrive\Desktop\pak-tech

# Initialize git
git init
git add .
git commit -m "Pak-Tech - Initial deployment with mobile responsiveness"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/pak-tech.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

---

### **Step 2: Deploy Backend to Railway**

#### 2.1 Connect GitHub to Railway
1. Go to https://railway.app
2. Login/Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub"**
5. Authorize GitHub
6. Select `pak-tech` repository

#### 2.2 Railway Auto-Detects & Deploys
- Railway automatically detects Node.js
- Builds and deploys automatically
- You'll see deployment logs in real-time

#### 2.3 Add PostgreSQL Database
1. In Railway Dashboard, click **"+ Add Service"**
2. Search and select **"PostgreSQL"**
3. Railway creates database automatically
4. Connection URL auto-populated in environment

#### 2.4 Configure Environment Variables
Railway auto-creates `DATABASE_URL`, add others:

```
PORT=3000
JWT_SECRET=paktech_super_secret_jwt_key_2025
EMAIL_USER=paktechconsultants@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=paktechconsultants@gmail.com
NODE_ENV=production
```

#### 2.5 Run Database Schema
1. In Railway, go to PostgreSQL plugin
2. Click **"Connect"** tab
3. Use the CLI command to run SQL:
```bash
psql [CONNECTION_STRING] < backend/models/db.sql
```

Or use Railway dashboard's SQL editor to paste the schema.

---

### **Step 3: Deploy Frontend to Vercel**

#### 3.1 Connect GitHub to Vercel
1. Go to https://vercel.com
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Select `pak-tech` repository
5. Click **"Import"**

#### 3.2 Configure Build Settings
- **Framework:** Select "Other" (static site)
- **Build Command:** (leave empty)
- **Output Directory:** `.` (root)

#### 3.3 Add Environment Variables
Click **"Environment Variables"** and add:
```
REACT_APP_API_BASE=https://YOUR_RAILWAY_BACKEND_URL/api
```

Get your Railway backend URL from Railway dashboard.

#### 3.4 Deploy
- Click **"Deploy"**
- Vercel auto-deploys on every GitHub push
- You'll get a URL like: `https://pak-tech.vercel.app`

---

## 🔄 Auto-Deploy Setup (GitHub → Railway/Vercel)

### **How It Works**
1. You push code to GitHub
2. Railway & Vercel automatically pull latest code
3. Frontend builds and deploys to Vercel
4. Backend builds and deploys to Railway
5. Database stays intact, data persists

### **No More Manual Deployments!**

**Example:**
```bash
# Make changes locally
# Edit index.html, commit and push
git add .
git commit -m "Fix mobile responsiveness"
git push origin main

# Railway & Vercel automatically redeploy! ✅
# Your website updates in 2-3 minutes
```

---

## 📱 Testing After Deployment

### **Test Frontend**
1. Visit your Vercel URL: `https://pak-tech.vercel.app`
2. Check all pages load correctly
3. Test contact form (posts to Railway API)
4. Test mobile responsiveness

### **Test Backend**
1. Test API directly: 
```
https://YOUR_RAILWAY_URL/api/health
```
2. Test endpoints:
```
GET https://YOUR_RAILWAY_URL/api/blog
GET https://YOUR_RAILWAY_URL/api/team
GET https://YOUR_RAILWAY_URL/api/clients
POST https://YOUR_RAILWAY_URL/api/contact
```

### **Test Admin Panel**
1. Visit `https://pak-tech.vercel.app/admin`
2. Login with:
   - Email: `paktechconsultants@gmail.com`
   - Password: `paktech@admin2025`
3. Test all functionality

---

## 🔗 Production URLs

After deployment, you'll have:

```
📱 Frontend: https://pak-tech.vercel.app
🎛️ Admin Panel: https://pak-tech.vercel.app/admin
🔌 Backend API: https://[your-backend].up.railway.app/api
📊 Database: PostgreSQL on Railway (auto-managed)
```

---

## 🛠️ Troubleshooting

### Backend Not Working
- Check Railway logs for errors
- Verify environment variables in Railway dashboard
- Check PostgreSQL connection string
- Run `models/db.sql` again if tables missing

### Frontend Not Loading Data
- Check Vercel build logs
- Verify API URL in environment variables
- Check browser console for errors
- Ensure Railway backend is running

### Database Issues
- Connect to PostgreSQL using Railway CLI
- Verify tables exist: `\dt` command
- Check user permissions
- Restore from backup if needed

---

## 📊 Costs

### **Free Tier Summary**
| Service | Cost | Limit |
|---------|------|-------|
| **Vercel** | Free | 100GB bandwidth/month |
| **Railway** | $5/month credits | Generous free tier |
| **GitHub** | Free | Unlimited public repos |
| **PostgreSQL** | Included | Included with Railway |

**Total Monthly Cost: FREE to $5 (Railway credits)**

---

## 🚀 Deployment Checklist

- [ ] Create GitHub account
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create Railway account
- [ ] Connect GitHub to Railway
- [ ] Deploy backend
- [ ] Add PostgreSQL to Railway
- [ ] Run database schema
- [ ] Create Vercel account
- [ ] Connect GitHub to Vercel
- [ ] Deploy frontend
- [ ] Test all endpoints
- [ ] Test contact form
- [ ] Test admin login
- [ ] Verify mobile responsiveness

---

## 📞 Support

If you face issues:
1. Check service status pages
2. Review deployment logs
3. Check GitHub issues
4. Contact support:
   - Railway: https://railway.app/support
   - Vercel: https://vercel.com/support

---

## ✅ You're Live!

Your Pak-Tech website is now deployed, scalable, and auto-updating!

**Key Benefits:**
- ✅ Auto-deploy on every Git push
- ✅ Free hosting tier
- ✅ Mobile responsive
- ✅ Professional APIs
- ✅ Admin panel ready
- ✅ Database included
- ✅ Email notifications
- ✅ JWT authentication

🎉 **Congratulations! Your website is production-ready!**

