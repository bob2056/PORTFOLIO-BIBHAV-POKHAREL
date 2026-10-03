# Bibhav Pokharel - Full-Stack Personal Portfolio

A modern, professional, high-performance **full-stack personal developer portfolio** built for **Bibhav Pokharel**, an MSc Advanced Computing student at Keele University / British College and BSc CSIT graduate.

This application showcases production-grade full-stack MERN web applications, applied AI / Machine Learning pipelines, technical skill proficiencies across 7 categories, academic credentials, live GitHub synchronization (`bob2056`), a working contact system with database storage, and a password-protected administrative management portal with JWT authentication and Multer multipart image uploads.

---

## 🌟 Key Features

- **Modern Developer Aesthetic**: Sleek developer-first dark mode by default with light mode toggle, curated gradients, responsive typography (Inter & JetBrains Mono), and subtle micro-animations.
- **Next.js App Router**: Built with the latest stable Next.js architecture, server-rendered components, dynamic routing (`/projects/[slug]`), and SEO metadata.
- **RESTful TypeScript Backend**: Modular Node.js + Express + TypeScript service architecture with strict input validation, centralized error handling, and security hardening (`helmet`, `cors`, `morgan`).
- **MongoDB & Mongoose**: Fully structured schemas with Mongoose models for Profile, Projects, Skills, Contact Messages, and Admins.
- **Live GitHub Synchronization**: Backend service queries GitHub's REST API for user `bob2056` (`https://github.com/bob2056`), rendering live stars, forks, languages, and repo links with language filtering and resilient offline caching.
- **Protected Admin Portal (`/admin`)**:
  - Secure JWT authentication (bcrypt password hashing, token expiration, HTTP authorization middleware).
  - Profile management: edit name, bio, titles, social links, and placeholders.
  - Multer image uploads: upload and change profile photo or project banners with filetype validation (JPG, PNG, WEBP) and size limits (max 5MB).
  - Projects CRUD: add new projects, update existing projects, or delete them.
  - Skills CRUD: manage skills with proficiency level sliders and category groupings.
  - Recruiter Inquiries Inbox: read incoming contact messages, mark as read, and delete messages.
- **Zero-Flicker Fallbacks**: When backend or MongoDB is offline during initial startup, the frontend seamlessly renders complete, authentic default data for Bibhav without broken layouts or blank screens.

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Library**: React & React DOM
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Centralized Axios with request/response interceptors
- **Icons**: Lucide React
- **Package Manager**: `pnpm`

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Security & Utility**: Helmet, CORS, Morgan, Dotenv
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **File Uploads**: `multer` (with diskStorage, mimetype filter, and size restrictions)
- **Validation**: `express-validator`
- **Development**: `nodemon` & `ts-node`

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

- **Node.js**: v18+ (tested on Node v26)
- **pnpm**: `pnpm -v` (or install via `npm i -g pnpm`)
- **MongoDB**: A local MongoDB instance (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string.

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
   MONGODB_URI=<your-local-or-Atlas-connection-string>
   JWT_SECRET=<generate-a-long-random-secret>
   ADMIN_EMAIL=<your-admin-email>
   ADMIN_PASSWORD=<unique-password-at-least-12-characters>
   GITHUB_TOKEN=
   GITHUB_USERNAME=bob2056
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   CONTACT_EMAIL=bibhav.bale@gmail.com
   ```

4. Seed the database with default data and create the initial Admin account using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your private `.env`:

   ```bash
   pnpm seed
   ```

   > **Note**: No default admin credentials are created or logged. Keep the seed credentials private.

5. Start the backend development server:

   ```bash
   pnpm dev
   ```

   - The API runs at: `http://localhost:5000`
   - Health Check: `http://localhost:5000/api/health`

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

### Admin Capabilities:

1. **Profile**: Update full name, bio, job titles, phone, CV link, and upload a new profile photo directly through the Multer file uploader.
2. **Projects**: Add, edit, or delete featured projects.
3. **Skills**: Add or adjust proficiency levels and categories.
4. **Contact Messages**: View inquiries submitted by recruiters/employers, mark messages as read, or delete them.

---

## 📡 REST API Documentation

| Method   | Endpoint                    | Protection    | Description                                             |
| :------- | :-------------------------- | :------------ | :------------------------------------------------------ |
| `GET`    | `/api/health`               | Public        | Server health status                                    |
| `GET`    | `/api/profile`              | Public        | Get Bibhav's professional profile                       |
| `PUT`    | `/api/profile`              | **Admin JWT** | Update profile information                              |
| `POST`   | `/api/profile/upload-photo` | **Admin JWT** | Upload profile picture (`multipart/form-data`)          |
| `GET`    | `/api/projects`             | Public        | List all projects (supports `?category=`, `?featured=`) |
| `GET`    | `/api/projects/:slug`       | Public        | Get project details by unique slug                      |
| `POST`   | `/api/projects`             | **Admin JWT** | Create a new project                                    |
| `PUT`    | `/api/projects/:id`         | **Admin JWT** | Update an existing project                              |
| `DELETE` | `/api/projects/:id`         | **Admin JWT** | Delete a project                                        |
| `GET`    | `/api/skills`               | Public        | List technical skills (supports `?category=`)           |
| `POST`   | `/api/skills`               | **Admin JWT** | Add a new technical skill                               |
| `PUT`    | `/api/skills/:id`           | **Admin JWT** | Update a technical skill                                |
| `DELETE` | `/api/skills/:id`           | **Admin JWT** | Delete a technical skill                                |
| `POST`   | `/api/contact`              | Public        | Submit a contact form message                           |
| `GET`    | `/api/contact`              | **Admin JWT** | Get all recruiter/client contact messages               |
| `PUT`    | `/api/contact/:id/status`   | **Admin JWT** | Update message status (`read`/`unread`/`replied`)       |
| `DELETE` | `/api/contact/:id`          | **Admin JWT** | Delete a contact message                                |
| `GET`    | `/api/github/repos`         | Public        | Fetch live public GitHub repos for `bob2056`            |
| `POST`   | `/api/auth/login`           | Public        | Authenticate admin and receive JWT token                |
| `GET`    | `/api/auth/me`              | **Admin JWT** | Verify active session                                   |

---

## 🌐 Connecting Live GitHub

The backend integrates directly with GitHub:

- Username configured: `bob2056` (`https://github.com/bob2056`)
- By default, it accesses public repositories without requiring a token.
- If you want to increase GitHub API rate limits (from 60/hr to 5,000/hr), generate a personal access token at [github.com/settings/tokens](https://github.com/settings/tokens) (read-only `public_repo` scope) and set:
  ```env
  GITHUB_TOKEN=ghp_your_token_here
  ```
  in `backend/.env`.

---

## 🚢 Deployment Guide

Deploy the API first so its public URL is available to the frontend.

### 1. Prepare MongoDB

1. Create a MongoDB Atlas cluster and database user.
2. Configure Atlas Network Access to allow connections from your Render service. For a quick setup, Atlas can allow `0.0.0.0/0`; use a more restrictive allowlist when practical.
3. Copy the Atlas connection string. Replace its placeholder username, password, and database name before adding it to Render.

### 2. Deploy the Backend to Render

1. Push the repository to GitHub and create a **Web Service** in [Render](https://render.com) using that repository.
2. Set **Root Directory** to `backend` and use the Node runtime.
3. Set **Build Command** to `pnpm install --frozen-lockfile && pnpm build`.
4. Set **Start Command** to `pnpm start`.
5. Add these environment variables in Render:

   | Name                                                              | Value                                                                 |
   | :---------------------------------------------------------------- | :-------------------------------------------------------------------- |
   | `NODE_ENV`                                                        | `production`                                                          |
   | `MONGODB_URI`                                                     | Your MongoDB Atlas connection string                                  |
   | `JWT_SECRET`                                                      | A newly generated, long random secret                                 |
   | `ADMIN_EMAIL`, `ADMIN_PASSWORD`                                   | One-time credentials for the initial database seed                    |
   | `CLIENT_URL`                                                      | Your Vercel production URL, added after frontend deployment           |
   | `CONTACT_EMAIL`                                                   | `bibhav.bale@gmail.com`                                               |
   | `GITHUB_USERNAME`                                                 | `bob2056` (optional; already the default)                             |
   | `GITHUB_TOKEN`                                                    | A GitHub token (optional)                                             |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Your mail provider settings; required for contact-form email delivery |

   Do not set `PORT`; Render provides it. After deployment, check `https://<render-service>.onrender.com/api/health`.

### 3. Deploy the Frontend to Vercel

1. Create a project in [Vercel](https://vercel.com) from the same GitHub repository.
2. Set **Root Directory** to `frontend`. Vercel should detect Next.js and the `pnpm` lockfile automatically.
3. Add the environment variable `NEXT_PUBLIC_API_URL` with value `https://<render-service>.onrender.com/api`.
4. Deploy the project.
5. Copy the production URL assigned by Vercel, set it as Render's `CLIENT_URL`, and redeploy the Render service. This allows the API's CORS policy to accept requests from the production frontend.

### 4. First Login and Uploaded Images

The login endpoint never creates an admin account. To initialize an empty production database, run `pnpm seed` once with `MONGODB_URI`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` set privately. After seeding, remove `ADMIN_PASSWORD` from the hosting environment if it was added there. Existing admin accounts are not changed by seeding.

Admin image uploads are stored in `backend/uploads`. Render's default filesystem is ephemeral, so uploaded images can disappear when the service is replaced or redeployed. Before relying on admin uploads, configure persistent storage mounted at the upload directory or move uploads to object storage such as S3 or Cloudinary.

### 5. Verify the Deployment

1. Open the Vercel site and check that profile, projects, skills, and GitHub data load.
2. Submit a contact form and verify both the database record and email delivery. SMTP settings are needed for email delivery.
3. Sign in at `/admin` with the first-admin credentials and verify that protected API requests work.

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

- **Education**: MSc Advanced Computing (Keele University / British College) & BSc CSIT (Tribhuvan University)
- **GitHub**: [@bob2056](https://github.com/bob2056)
- **LinkedIn**: [Bibhav Pokharel](https://www.linkedin.com/in/bibhav-pokharel-47669a31a/)
- **Portfolio**: [https://bibhavpokharel.com](https://bibhavpokharel.com)
