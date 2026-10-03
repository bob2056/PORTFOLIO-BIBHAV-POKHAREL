export interface Profile {
  _id?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack' | 'AI/ML' | 'Other';

export interface Project {
  _id?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Programming'
  | 'AI / Machine Learning'
  | 'Tools'
  | 'DevOps';

export interface Skill {
  _id?: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt?: string;
  updatedAt?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  homepage: string | null;
  topics: string[];
  fork: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AdminUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}
