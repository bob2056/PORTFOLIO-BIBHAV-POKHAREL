import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  fullName: string;
  professionalTitle: string;
  shortIntro: string;
  aboutDescription: string;
  profileImage: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
  personalWebsiteUrl: string;
  yearsOfExperience: string;
  availability: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      default: 'Bibhav Pokharel',
    },
    professionalTitle: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
      default: 'Advanced Computing Student | Aspiring Software & Full-Stack Developer',
    },
    shortIntro: {
      type: String,
      required: [true, 'Short introduction is required'],
      trim: true,
      default:
        'Passionate Computer Science & Advanced Computing student focused on building robust full-stack web applications, software solutions, and machine learning pipelines.',
    },
    aboutDescription: {
      type: String,
      required: [true, 'About description is required'],
      trim: true,
      default:
        'I am an MSc Advanced Computing student at Keele University / British College, with a BSc in CSIT from Tribhuvan University (2019-2023). My core focus centers on modern full-stack MERN engineering (Next.js, React, Node.js, Express, MongoDB, TypeScript) and applied AI / Machine Learning pipelines in Python (Scikit-learn, neural networks, predictive modeling, NLP). Currently seeking opportunities as a Full-Stack MERN Developer, AI/ML Engineer, or Software Engineer.',
    },
    profileImage: {
      type: String,
      default: '/profile.jpg',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      default: 'bibhav.pokharel@example.com',
    },
    phone: {
      type: String,
      trim: true,
      default: '[ADD YOUR PHONE]',
    },
    location: {
      type: String,
      trim: true,
      default: 'Kathmandu, Nepal / Keele, UK',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: 'https://github.com/bob2056',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: 'https://www.linkedin.com/in/bibhav-pokharel-47669a31a/',
    },
    cvUrl: {
      type: String,
      trim: true,
      default: '[ADD YOUR CV]',
    },
    personalWebsiteUrl: {
      type: String,
      trim: true,
      default: 'https://bibhavpokharel.com',
    },
    yearsOfExperience: {
      type: String,
      trim: true,
      default: '1+ Years (Academic & Internship)',
    },
    availability: {
      type: String,
      trim: true,
      default: 'Open to Junior Developer & Internship roles',
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
