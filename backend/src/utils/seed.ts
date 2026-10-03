import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Admin } from '../models/Admin';
import { Profile } from '../models/Profile';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { DEFAULT_PROJECTS } from '../controllers/project.controller';
import { DEFAULT_SKILLS } from '../controllers/skill.controller';

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bibhav_portfolio';
  console.log(`[Seed] Connecting to MongoDB: ${uri}`);

  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB.');

    // 1. Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = 'admin@bibhavpokharel.com';
      const password = 'ChangeMe123!';
      await Admin.create({
        email,
        password,
        role: 'admin',
      });
      console.log(`[Seed] Created initial Admin account: ${email} (Password: ${password})`);
    } else {
      console.log(`[Seed] Admin already exists (${adminCount} found).`);
    }

    // 2. Seed Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        fullName: 'Bibhav Pokharel',
        professionalTitle: 'Advanced Computing Student | Full-Stack MERN & AI/ML Developer',
        shortIntro:
          'Passionate Advanced Computing student and Software Developer specializing in full-stack MERN (MongoDB, Express, React, Node.js, Next.js) web applications and applied AI / Machine Learning solutions.',
        aboutDescription:
          'I am an MSc Advanced Computing student at Keele University / British College, with a BSc in CSIT from Tribhuvan University (2019-2023). My core focus centers on modern full-stack MERN engineering (Next.js, React, Node.js, Express, MongoDB, TypeScript) and applied AI / Machine Learning pipelines in Python (Scikit-learn, neural networks, predictive modeling, NLP). Currently seeking opportunities as a Full-Stack MERN Developer, AI/ML Engineer, or Software Engineer.',
        profileImage: '/profile.jpg',
        email: 'bibhav.pokharel@example.com',
        phone: '[ADD YOUR PHONE]',
        location: 'Kathmandu, Nepal / Keele, UK',
        githubUrl: 'https://github.com/bob2056',
        linkedinUrl: 'https://www.linkedin.com/in/bibhav-pokharel-47669a31a/',
        cvUrl: '[ADD YOUR CV]',
        personalWebsiteUrl: 'https://bibhavpokharel.com',
        yearsOfExperience: '1+ Years (Academic & Practical Development)',
        availability: 'Available for Full-Stack MERN & AI/ML Developer Roles',
      });
      console.log('[Seed] Created default Profile for Bibhav Pokharel.');
    } else {
      console.log(`[Seed] Profile already exists.`);
    }

    // 3. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(DEFAULT_PROJECTS);
      console.log(`[Seed] Seeded ${DEFAULT_PROJECTS.length} default projects.`);
    } else {
      console.log(`[Seed] Projects already exist (${projectCount} found).`);
    }

    // 4. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(DEFAULT_SKILLS);
      console.log(`[Seed] Seeded ${DEFAULT_SKILLS.length} default skills.`);
    } else {
      console.log(`[Seed] Skills already exist (${skillCount} found).`);
    }

    console.log('[Seed] Database seeding completed successfully! ✨');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
