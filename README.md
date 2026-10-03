# Bibhav Pokharel - Full-Stack Personal Portfolio

A modern, professional, high-performance **full-stack personal developer portfolio** built for **Bibhav Pokharel**, an MSc Advanced Computing student at Keele University / British College and BSc CSIT graduate.

This application showcases production-grade full-stack MERN web applications, applied AI / Machine Learning pipelines, technical skill proficiencies across 7 categories, academic credentials, live GitHub synchronization (`bob2056`), a working contact system with database storage, and a password-protected administrative management portal with JWT authentication and Multer multipart image uploads.

---

## 🌟 Key Features

* **Modern Developer Aesthetic**: Sleek developer-first dark mode by default with light mode toggle, curated gradients, responsive typography (Inter & JetBrains Mono), and subtle micro-animations.
* **Next.js App Router**: Built with the latest stable Next.js architecture, server-rendered components, dynamic routing (`/projects/[slug]`), and SEO metadata.
* **RESTful TypeScript Backend**: Modular Node.js + Express + TypeScript service architecture with strict input validation, centralized error handling, and security hardening (`helmet`, `cors`, `morgan`).
* **MongoDB & Mongoose**: Fully structured schemas with Mongoose models for Profile, Projects, Skills, Contact Messages, and Admins.
* **Live GitHub Synchronization**: Backend service queries GitHub's REST API for user `bob2056` (`https://github.com/bob2056`), rendering live stars, forks, languages, and repo links with language filtering and resilient offline caching.
* **Protected Admin Portal (`/admin`)**:
  * Secure JWT authentication (bcrypt password hashing, token expiration, HTTP authorization middleware).
  * Profile management: edit name, bio, titles, social links, and placeholders.
  * Multer image uploads: upload and change profile photo or project banners with filetype validation (JPG, PNG, WEBP) and size limits (max 5MB).
  * Projects CRUD: add new projects, update existing projects, or delete them.
  * Skills CRUD: manage skills with proficiency level sliders and category groupings.
  * Recruiter Inquiries Inbox: read incoming contact messages, mark as read, and delete messages.
* **Zero-Flicker Fallbacks**: When backend or MongoDB is offline during initial startup, the frontend seamlessly renders complete, authentic default data for Bibhav without broken layouts or blank screens.

---

## 🛠️ Technology Stack

### Frontend
* **Framework**: Next.js (App Router)
* **Library**: React & React DOM
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **HTTP Client**: Centralized Axios with request/response interceptors
* **Icons**: Lucide React
* **Package Manager**: `pnpm`

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Language**: TypeScript
* **Database**: MongoDB with Mongoose ODM
* **Security & Utility**: Helmet, CORS, Morgan, Dotenv
* **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
* **File Uploads**: `multer` (with diskStorage, mimetype filter, and size restrictions)
* **Validation**: `express-validator`
* **Development**: `nodemon` & `ts-node`

---

## 📂 Project Structure

```text
bibhav-portfolio/
│
├── frontend/                     # Next.js App Router Frontend
│   ├── app/                      # App router pages & layouts
│   │   ├── layout.tsx            # Root layout, Google fonts, metadata
│   │   ├── page.tsx              # Comprehensive homepage assembling all sections
│   │   ├── globals.css           # Tailwind CSS styles & design tokens
│   │   ├── about/page.tsx        # Dedicated About & Education page
│   │   ├── projects/page.tsx     # Projects gallery with GitHub repos
│   │   ├── projects/[slug]/      # Dynamic project architectural detail page
│   │   ├── skills/page.tsx       # Full technical skills matrix
│   │   ├── experience/page.tsx   # Professional experience & degrees
│   │   ├── contact/page.tsx      # Contact form & direct links
│   │   └── admin/page.tsx        # Protected Admin Dashboard
│   ├── components/               # Reusable UI & section components
│   │   ├── Navbar.tsx            # Sticky navbar with mobile hamburger menu
│   │   ├── Footer.tsx            # Authentic developer footer
│   │   ├── Hero.tsx              # Profile photo, titles, CTAs, social links
│   │   ├── About.tsx             # Professional bio & highlights
│   │   ├── Skills.tsx            # Category tabs & proficiency bars
│   │   ├── Projects.tsx          # Filterable project portfolio & search
│   │   ├── ProjectCard.tsx       # Individual project card with action buttons
│   │   ├── GitHubProjects.tsx    # Live repository viewer from GitHub API
│   │   ├── Experience.tsx        # MERN & AI/ML engineering career timeline
│   │   ├── Education.tsx         # MSc & BSc degree milestones
│   │   ├── Contact.tsx           # Contact form with database integration
│   │   └── ThemeToggle.tsx       # Light / Dark mode switcher
│   ├── lib/
│   │   ├── axios.ts              # Centralized Axios instance with auth interceptor
│   │   └── utils.ts              # Fallback mock data and class merger
│   ├── types/                    # Shared TypeScript types & interfaces
│   ├── public/                   # Static assets & profile.jpg
│   ├── .env.local                # Frontend environment variables
│   ├── .env.example
│   └── package.json
│
├── backend/                      # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/               # Database connection (MongoDB)
│   │   │   └── database.ts
│   │   ├── controllers/          # Business logic handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── profile.controller.ts
│   │   │   ├── project.controller.ts
│   │   │   ├── skill.controller.ts
│   │   │   └── contact.controller.ts
│   │   ├── models/               # Mongoose data models
│   │   │   ├── Admin.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Project.ts
│   │   │   ├── Skill.ts
│   │   │   └── Contact.ts
│   │   ├── routes/               # Express API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── profile.routes.ts
│   │   │   ├── project.routes.ts
│   │   │   ├── skill.routes.ts
│   │   │   ├── contact.routes.ts
│   │   │   └── github.routes.ts
│   │   ├── middleware/           # Auth, Multer upload & Error middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── upload.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── services/             # External services (GitHub API)
│   │   │   └── github.service.ts
│   │   ├── utils/                # Utilities & database seeder
│   │   │   ├── slugify.ts
│   │   │   └── seed.ts
│   │   ├── app.ts                # Express app configuration
│   │   └── server.ts             # Server entry point
│   ├── uploads/                  # Uploaded profile/project images
│   ├── .env                      # Backend environment variables
│   ├── .env.example
│   ├── tsconfig.json
│   ├── nodemon.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18+ (tested on Node v26)
* **pnpm**: `pnpm -v` (or install via `npm i -g pnpm`)
* **MongoDB**: A local MongoDB instance (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string.

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/bob2056/bibhav-portfolio.git
cd bibhav-portfolio
```

---

### Step 2: Backend Setup & Seeding

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/bibhav_portfolio
   JWT_SECRET=super_secret_jwt_key_bibhav_portfolio_2026
   GITHUB_TOKEN=
   GITHUB_USERNAME=bob2056
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. Seed the database with default data and create the initial Admin account:
   ```bash
   pnpm seed
   ```
   > **Note**: This automatically creates the default Admin user (`admin@bibhavpokharel.com` / `ChangeMe123!`), populates Bibhav's profile, default projects, and skills.

5. Start the backend development server:
   ```bash
   pnpm dev
   ```
   * The API runs at: `http://localhost:5000`
   * Health Check: `http://localhost:5000/api/health`

---

### Step 3: Frontend Setup & Launch

1. Open a new terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Ensure `frontend/.env.local` points to your backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the Next.js development server:
   ```bash
   pnpm dev
   ```

5. Open your browser at:
   ```text
   http://localhost:3000
   ```

---

## 🔑 Administrative Access

Visit:
```text
http://localhost:3000/admin
```

* **Default Email**: `admin@bibhavpokharel.com`
* **Default Password**: `ChangeMe123!`

### Admin Capabilities:
1. **Profile**: Update full name, bio, job titles, phone, CV link, and upload a new profile photo directly through the Multer file uploader.
2. **Projects**: Add, edit, or delete featured projects.
3. **Skills**: Add or adjust proficiency levels and categories.
4. **Contact Messages**: View inquiries submitted by recruiters/employers, mark messages as read, or delete them.

---

## 📡 REST API Documentation

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server health status |
| `GET` | `/api/profile` | Public | Get Bibhav's professional profile |
| `PUT` | `/api/profile` | **Admin JWT** | Update profile information |
| `POST` | `/api/profile/upload-photo` | **Admin JWT** | Upload profile picture (`multipart/form-data`) |
| `GET` | `/api/projects` | Public | List all projects (supports `?category=`, `?featured=`) |
| `GET` | `/api/projects/:slug` | Public | Get project details by unique slug |
| `POST` | `/api/projects` | **Admin JWT** | Create a new project |
| `PUT` | `/api/projects/:id` | **Admin JWT** | Update an existing project |
| `DELETE` | `/api/projects/:id` | **Admin JWT** | Delete a project |
| `GET` | `/api/skills` | Public | List technical skills (supports `?category=`) |
| `POST` | `/api/skills` | **Admin JWT** | Add a new technical skill |
| `PUT` | `/api/skills/:id` | **Admin JWT** | Update a technical skill |
| `DELETE` | `/api/skills/:id` | **Admin JWT** | Delete a technical skill |
| `POST` | `/api/contact` | Public | Submit a contact form message |
| `GET` | `/api/contact` | **Admin JWT** | Get all recruiter/client contact messages |
| `PUT` | `/api/contact/:id/status` | **Admin JWT** | Update message status (`read`/`unread`/`replied`) |
| `DELETE` | `/api/contact/:id` | **Admin JWT** | Delete a contact message |
| `GET` | `/api/github/repos` | Public | Fetch live public GitHub repos for `bob2056` |
| `POST` | `/api/auth/login` | Public | Authenticate admin and receive JWT token |
| `GET` | `/api/auth/me` | **Admin JWT** | Verify active session |

---

## 🌐 Connecting Live GitHub

The backend integrates directly with GitHub:
* Username configured: `bob2056` (`https://github.com/bob2056`)
* By default, it accesses public repositories without requiring a token.
* If you want to increase GitHub API rate limits (from 60/hr to 5,000/hr), generate a personal access token at [github.com/settings/tokens](https://github.com/settings/tokens) (read-only `public_repo` scope) and set:
  ```env
  GITHUB_TOKEN=ghp_your_token_here
  ```
  in `backend/.env`.

---

## 🚢 Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub (`bob2056/bibhav-portfolio`).
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select the repository and set the **Root Directory** to `frontend`.
4. Add the Environment Variable:
   * `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g. `https://api.yourdomain.com/api`).
5. Click **Deploy**.

### Deploying Backend to Render / Railway / DigitalOcean
1. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service**.
2. Select your repository with the **Root Directory** set to `backend`.
3. Set Build Command: `pnpm install && pnpm build`.
4. Set Start Command: `node dist/server.js`.
5. Add Environment Variables:
   * `PORT`: `5000` (or provided by host)
   * `MONGODB_URI`: Your MongoDB Atlas URI
   * `JWT_SECRET`: A secure random secret key
   * `CLIENT_URL`: Your Vercel frontend URL
   * `NODE_ENV`: `production`

---

## 📋 Production Checklist

- [x] TypeScript builds without errors on backend and frontend
- [x] MongoDB models created with indexes and validation
- [x] Multer configured with file extension and 5MB size limit
- [x] Security headers enabled via `helmet`
- [x] CORS configured for production domain
- [x] Centralized Axios instance with JWT interceptor
- [x] Responsive layout tested for mobile, tablet, and desktop
- [x] SEO meta tags and Open Graph data configured in `app/layout.tsx`
- [x] Fallback offline data in place for zero-flicker resilience
- [x] Contact form connected to database with email validation
- [x] Admin dashboard with JWT authentication and CRUD operations
- [x] GitHub API integration for `bob2056`

---

## 👤 Author

**Bibhav Pokharel**
* **Education**: MSc Advanced Computing (Keele University / British College) & BSc CSIT (Tribhuvan University)
* **GitHub**: [@bob2056](https://github.com/bob2056)
* **LinkedIn**: [Bibhav Pokharel](https://www.linkedin.com/in/bibhav-pokharel-47669a31a/)
* **Portfolio**: [https://bibhavpokharel.com](https://bibhavpokharel.com)
