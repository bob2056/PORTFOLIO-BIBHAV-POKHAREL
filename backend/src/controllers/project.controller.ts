import { Request, Response, NextFunction } from 'express';
import { Project, IProject } from '../models/Project';
import { slugify } from '../utils/slugify';

// Fallback seed projects if database is empty/offline
export const DEFAULT_PROJECTS: Partial<IProject>[] = [
  {
    title: 'Full-Stack MERN Blog Platform',
    slug: 'full-stack-mern-blog-platform',
    shortDescription:
      'Scalable blogging platform built with React, Node.js, Express, MongoDB, and TypeScript featuring JWT authentication and rich markdown.',
    fullDescription:
      'A comprehensive full-stack blogging system built with modern best practices. Features include role-based access control (RBAC), robust authentication with JSON Web Tokens, responsive reader UI, comment system, category filtering, and optimized MongoDB aggregations for performance.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'Full Stack',
    image: '/projects/blog-platform.jpg',
    githubUrl: 'https://github.com/bob2056/BLOG_APP-MERN_STACK-',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Interactive Web Novel Reader',
    slug: 'interactive-web-novel-reader',
    shortDescription:
      'Modern web reader application with offline reading capabilities, typography customization, and responsive layout.',
    fullDescription:
      'A high-performance digital library and web novel reader designed for immersive reading. Includes dark mode, customizable fonts and text sizes, reading progress persistence, and clean TypeScript architecture.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    category: 'Frontend',
    image: '/projects/web-novel.jpg',
    githubUrl: 'https://github.com/bob2056/WEB_NOVELS',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Data Visualization & ML Analytics Case Study',
    slug: 'data-visualization-ml-analytics',
    shortDescription:
      'Exploratory data analysis, statistical modeling, and machine learning visualization pipelines in Python.',
    fullDescription:
      'Advanced exploratory data analysis and predictive modeling using Python, Pandas, Matplotlib, Seaborn, and Scikit-learn. Explores clustering, feature correlation analysis, and regression modeling with comprehensive visual reports.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    category: 'AI/ML',
    image: '/projects/data-viz.jpg',
    githubUrl: 'https://github.com/bob2056/Data-visualization-case-2-',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'AI/ML Sentiment Analysis & Neural Predictive Model',
    slug: 'ai-ml-sentiment-analysis-predictive-model',
    shortDescription:
      'Machine learning NLP classification and predictive analysis pipeline built with Python, Scikit-learn, and neural architectures.',
    fullDescription:
      'An end-to-end Machine Learning and Natural Language Processing project focusing on sentiment classification, text preprocessing, feature engineering, and neural network modeling. Evaluates model performance using precision-recall metrics, confusion matrices, and interactive inference visualization.',
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'NLP', 'TensorFlow', 'NumPy'],
    category: 'AI/ML',
    image: '/projects/data-viz.jpg',
    githubUrl: 'https://github.com/bob2056',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Cloud Infrastructure & Deployment Demo',
    slug: 'cloud-infrastructure-deployment-demo',
    shortDescription:
      'Hands-on cloud architecture deployment showcasing containerization, reverse proxying, and CI/CD pipelines.',
    fullDescription:
      'Cloud setup demonstrating container orchestration, Nginx reverse proxy configuration, environment variable management, and automated deployment pipelines.',
    technologies: ['Docker', 'Nginx', 'Linux', 'Cloud Hosting', 'HTML/CSS'],
    category: 'Other',
    image: '/projects/cloud-demo.jpg',
    githubUrl: 'https://github.com/bob2056/Cloud-Demo',
    liveUrl: '',
    featured: false,
  },
];

// GET /api/projects
export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, featured, search } = req.query;
    const filter: any = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    if (search && typeof search === 'string') {
      filter.$text = { $search: search };
    }

    let projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });

    if (projects.length === 0 && (!category || category === 'All') && !search) {
      // If DB has no projects yet, return fallback projects
      let result = DEFAULT_PROJECTS;
      if (featured === 'true') {
        result = result.filter((p) => p.featured);
      }
      res.status(200).json({ success: true, count: result.length, data: result });
      return;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    // If DB is unreachable, return fallback projects gracefully
    let result = DEFAULT_PROJECTS;
    const { category, featured } = req.query;
    if (category && category !== 'All') {
      result = result.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      result = result.filter((p) => p.featured);
    }
    res.status(200).json({ success: true, count: result.length, data: result });
  }
};

// GET /api/projects/:slug
export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    let project = await Project.findOne({ slug });

    if (!project) {
      const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
      if (fallback) {
        res.status(200).json({ success: true, data: fallback });
        return;
      }
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    const { slug } = req.params;
    const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
    if (fallback) {
      res.status(200).json({ success: true, data: fallback });
      return;
    }
    next(error);
  }
};

// POST /api/projects (Protected)
export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, shortDescription, fullDescription, technologies, category, image, githubUrl, liveUrl, featured } = req.body;

    let slug = req.body.slug ? slugify(req.body.slug) : slugify(title);

    // Verify unique slug
    let existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map((t) => t.trim())
      : [];

    const project = await Project.create({
      title,
      slug,
      shortDescription,
      fullDescription,
      technologies: techArray,
      category: category || 'Full Stack',
      image: image || '/project-placeholder.jpg',
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: Boolean(featured),
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (Protected)
export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }

    if (req.body.technologies && typeof req.body.technologies === 'string') {
      req.body.technologies = req.body.technologies.split(',').map((t: string) => t.trim());
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (Protected)
export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/upload-image (Protected)
export const uploadProjectImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file uploaded' });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      imageUrl,
      message: 'Project image uploaded successfully',
    });
  } catch (error) {
    next(error);
  }
};
