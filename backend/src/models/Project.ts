import mongoose, { Document, Schema } from 'mongoose';

export type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack' | 'AI/ML' | 'Other';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: ProjectCategory;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      default: [],
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Full Stack', 'AI/ML', 'Other'],
      default: 'Full Stack',
    },
    image: {
      type: String,
      default: '/project-placeholder.jpg',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
ProjectSchema.index({ title: 'text', shortDescription: 'text', fullDescription: 'text' });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
