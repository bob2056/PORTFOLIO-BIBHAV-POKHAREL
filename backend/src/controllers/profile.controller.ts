import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile';

// Default Bibhav Pokharel profile fallback if DB empty
const DEFAULT_PROFILE = {
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
};

// GET /api/profile
export const getProfile = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      try {
        profile = await Profile.create(DEFAULT_PROFILE);
      } catch {
        res.status(200).json({ success: true, data: DEFAULT_PROFILE });
        return;
      }
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    // If DB is offline, return default profile gracefully
    res.status(200).json({ success: true, data: DEFAULT_PROFILE });
  }
};

// PUT /api/profile (Protected)
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ ...DEFAULT_PROFILE, ...updateData });
    } else {
      Object.assign(profile, updateData);
      await profile.save();
    }
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/profile/upload-photo (Protected)
export const uploadProfilePhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file uploaded or file rejected by validator.',
      });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        ...DEFAULT_PROFILE,
        profileImage: imageUrl,
      });
    } else {
      profile.profileImage = imageUrl;
      await profile.save();
    }

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      imageUrl,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
