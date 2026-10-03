import { Request, Response, NextFunction } from 'express';
import { Skill, ISkill, SkillCategory } from '../models/Skill';

export const DEFAULT_SKILLS: Partial<ISkill>[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 90, icon: 'react', order: 1 },
  { name: 'Next.js', category: 'Frontend', level: 85, icon: 'nextjs', order: 2 },
  { name: 'TypeScript', category: 'Frontend', level: 85, icon: 'typescript', order: 3 },
  { name: 'JavaScript', category: 'Frontend', level: 90, icon: 'javascript', order: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'tailwind', order: 5 },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, icon: 'html', order: 6 },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 88, icon: 'nodejs', order: 1 },
  { name: 'Express.js', category: 'Backend', level: 88, icon: 'express', order: 2 },
  { name: 'Python', category: 'Backend', level: 85, icon: 'python', order: 3 },
  { name: 'Flask / FastAPI', category: 'Backend', level: 82, icon: 'flask', order: 4 },
  { name: 'REST & API Architecture', category: 'Backend', level: 88, icon: 'api', order: 5 },

  // Database
  { name: 'MongoDB & Mongoose', category: 'Database', level: 88, icon: 'mongodb', order: 1 },
  { name: 'PostgreSQL / SQL', category: 'Database', level: 82, icon: 'postgresql', order: 2 },

  // Programming
  { name: 'JavaScript (ES6+)', category: 'Programming', level: 92, icon: 'javascript', order: 1 },
  { name: 'TypeScript', category: 'Programming', level: 86, icon: 'typescript', order: 2 },
  { name: 'Python', category: 'Programming', level: 88, icon: 'python', order: 3 },
  { name: 'Java', category: 'Programming', level: 75, icon: 'java', order: 4 },

  // AI / ML
  { name: 'Machine Learning', category: 'AI / Machine Learning', level: 80, icon: 'brain', order: 1 },
  { name: 'Scikit-learn', category: 'AI / Machine Learning', level: 82, icon: 'scikit', order: 2 },
  { name: 'TensorFlow', category: 'AI / Machine Learning', level: 72, icon: 'tensorflow', order: 3 },
  { name: 'NLP & LLM Integrations', category: 'AI / Machine Learning', level: 78, icon: 'nlp', order: 4 },

  // Tools
  { name: 'Git & GitHub', category: 'Tools', level: 90, icon: 'git', order: 1 },
  { name: 'VS Code', category: 'Tools', level: 95, icon: 'vscode', order: 2 },
  { name: 'Postman', category: 'Tools', level: 88, icon: 'postman', order: 3 },
  { name: 'Docker', category: 'Tools', level: 75, icon: 'docker', order: 4 },

  // DevOps
  { name: 'Docker & Containers', category: 'DevOps', level: 75, icon: 'docker', order: 1 },
  { name: 'Linux / Bash Scripting', category: 'DevOps', level: 80, icon: 'linux', order: 2 },
  { name: 'CI/CD & Cloud Basics', category: 'DevOps', level: 72, icon: 'cloud', order: 3 },
];

// GET /api/skills
export const getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: any = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    let skills = await Skill.find(filter).sort({ order: 1, name: 1 });

    if (skills.length === 0 && (!category || category === 'All')) {
      res.status(200).json({ success: true, count: DEFAULT_SKILLS.length, data: DEFAULT_SKILLS });
      return;
    }

    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    let result = DEFAULT_SKILLS;
    const { category } = req.query;
    if (category && category !== 'All') {
      result = result.filter((s) => s.category === category);
    }
    res.status(200).json({ success: true, count: result.length, data: result });
  }
};

// POST /api/skills (Protected)
export const createSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, category, level, icon, order } = req.body;
    const skill = await Skill.create({
      name,
      category,
      level: Number(level) || 80,
      icon: icon || 'code',
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/skills/:id (Protected)
export const updateSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/skills/:id (Protected)
export const deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
