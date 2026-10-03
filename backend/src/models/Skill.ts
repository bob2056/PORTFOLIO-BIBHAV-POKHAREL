import mongoose, { Document, Schema } from 'mongoose';

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Programming'
  | 'AI / Machine Learning'
  | 'Tools'
  | 'DevOps';

export interface ISkill extends Document {
  name: string;
  category: SkillCategory;
  level: number; // 0 - 100
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: [
        'Frontend',
        'Backend',
        'Database',
        'Programming',
        'AI / Machine Learning',
        'Tools',
        'DevOps',
      ],
    },
    level: {
      type: Number,
      required: [true, 'Proficiency level (0-100) is required'],
      min: 0,
      max: 100,
      default: 80,
    },
    icon: {
      type: String,
      trim: true,
      default: 'code',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
