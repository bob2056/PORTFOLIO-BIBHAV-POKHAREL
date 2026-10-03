import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Profile, Project, Skill, GitHubRepo } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

// Fallback profile for resilient offline/development experience
export const FALLBACK_PROFILE: Profile = {
  fullName: "Bibhav Pokharel",
  professionalTitle:
    "Advanced Computing Student | Full-Stack MERN & AI/ML Developer",
  shortIntro:
    "Passionate Advanced Computing student and Software Developer specializing in full-stack MERN (MongoDB, Express, React, Node.js, Next.js) web applications and applied AI / Machine Learning solutions.",
  aboutDescription:
    "I am an MSc Advanced Computing student at Keele University / British College, holding a BSc in Computer Science and Information Technology (CSIT) from Tribhuvan University (2019–2023). My core focus centers on modern full-stack MERN engineering (Next.js, React, Node.js, Express, MongoDB, TypeScript) and applied AI / Machine Learning pipelines in Python (Scikit-learn, neural networks, predictive modeling, NLP). I am committed to clean code, scalable architecture, and continuous learning.",
  profileImage: "/profile.jpg",
  email: "bibhav.pokharel@example.com",
  phone: "[ADD YOUR PHONE]",
  location: "Kathmandu, Nepal / Keele, UK",
  githubUrl: "https://github.com/bob2056",
  linkedinUrl: "https://www.linkedin.com/in/bibhav-pokharel-47669a31a/",
  cvUrl: "[ADD YOUR CV]",
  personalWebsiteUrl: "https://bibhavpokharel.com",
  yearsOfExperience: "1+ Years (Academic & Practical Development)",
  availability: "Available for Full-Stack MERN & AI/ML Developer Roles",
};

// Fallback featured projects
export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "p1",
    title: "Full-Stack MERN Blog Platform",
    slug: "full-stack-mern-blog-platform",
    shortDescription:
      "Scalable blogging platform built with React, Node.js, Express, MongoDB, and TypeScript featuring JWT authentication and rich markdown.",
    fullDescription:
      "A comprehensive full-stack blogging system built with modern best practices. Features include role-based access control (RBAC), robust authentication with JSON Web Tokens, responsive reader UI, comment system, category filtering, and optimized MongoDB aggregations for performance.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    image: "/projects/blog-platform.jpg",
    githubUrl: "https://github.com/bob2056/BLOG_APP-MERN_STACK-",
    liveUrl: "",
    featured: true,
  },
  {
    _id: "p2",
    title: "Interactive Web Novel Reader",
    slug: "interactive-web-novel-reader",
    shortDescription:
      "Modern web reader application with offline reading capabilities, typography customization, and responsive layout.",
    fullDescription:
      "A high-performance digital library and web novel reader designed for immersive reading. Includes dark mode, customizable fonts and text sizes, reading progress persistence, and clean TypeScript architecture.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    category: "Frontend",
    image: "/projects/web-novel.jpg",
    githubUrl: "https://github.com/bob2056/WEB_NOVELS",
    liveUrl: "",
    featured: true,
  },
  {
    _id: "p3",
    title: "Data Visualization & ML Analytics Case Study",
    slug: "data-visualization-ml-analytics",
    shortDescription:
      "Exploratory data analysis, statistical modeling, and machine learning visualization pipelines in Python.",
    fullDescription:
      "Advanced exploratory data analysis and predictive modeling using Python, Pandas, Matplotlib, Seaborn, and Scikit-learn. Explores clustering, feature correlation analysis, and regression modeling with comprehensive visual reports.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter",
    ],
    category: "AI/ML",
    image: "/projects/data-viz.jpg",
    githubUrl: "https://github.com/bob2056/Data-visualization-case-2-",
    liveUrl: "",
    featured: true,
  },
  {
    _id: "p4",
    title: "AI/ML Sentiment Analysis & Neural Predictive Model",
    slug: "ai-ml-sentiment-analysis-predictive-model",
    shortDescription:
      "Machine learning NLP classification and predictive analysis pipeline built with Python, Scikit-learn, and neural architectures.",
    fullDescription:
      "An end-to-end Machine Learning and Natural Language Processing project focusing on sentiment classification, text preprocessing, feature engineering, and neural network modeling. Evaluates model performance using precision-recall metrics, confusion matrices, and interactive inference visualization.",
    technologies: [
      "Python",
      "Machine Learning",
      "Scikit-learn",
      "NLP",
      "TensorFlow",
      "NumPy",
    ],
    category: "AI/ML",
    image: "/projects/data-viz.jpg",
    githubUrl: "https://github.com/bob2056",
    liveUrl: "",
    featured: true,
  },
  {
    _id: "p5",
    title: "Cloud Infrastructure & Deployment Demo",
    slug: "cloud-infrastructure-deployment-demo",
    shortDescription:
      "Hands-on cloud architecture deployment showcasing containerization, reverse proxying, and CI/CD pipelines.",
    fullDescription:
      "Cloud setup demonstrating container orchestration, Nginx reverse proxy configuration, environment variable management, and automated deployment pipelines.",
    technologies: ["Docker", "Nginx", "Linux", "Cloud Hosting", "HTML/CSS"],
    category: "Other",
    image: "/projects/cloud-demo.jpg",
    githubUrl: "https://github.com/bob2056/Cloud-Demo",
    liveUrl: "",
    featured: false,
  },
];

// Fallback skills matching Bibhav's exact profile
export const FALLBACK_SKILLS: Skill[] = [
  // Frontend
  {
    name: "HTML5 & CSS3",
    category: "Frontend",
    level: 95,
    icon: "html",
    order: 1,
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    level: 90,
    icon: "javascript",
    order: 2,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 85,
    icon: "typescript",
    order: 3,
  },
  { name: "React", category: "Frontend", level: 90, icon: "react", order: 4 },
  {
    name: "Next.js",
    category: "Frontend",
    level: 85,
    icon: "nextjs",
    order: 5,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 90,
    icon: "tailwind",
    order: 6,
  },

  // Backend
  { name: "Node.js", category: "Backend", level: 88, icon: "nodejs", order: 1 },
  {
    name: "Express.js",
    category: "Backend",
    level: 88,
    icon: "express",
    order: 2,
  },
  { name: "Python", category: "Backend", level: 85, icon: "python", order: 3 },
  {
    name: "Flask / FastAPI",
    category: "Backend",
    level: 82,
    icon: "flask",
    order: 4,
  },
  {
    name: "RESTful API Architecture",
    category: "Backend",
    level: 88,
    icon: "api",
    order: 5,
  },

  // Database
  {
    name: "MongoDB",
    category: "Database",
    level: 88,
    icon: "mongodb",
    order: 1,
  },
  {
    name: "SQL / PostgreSQL",
    category: "Database",
    level: 82,
    icon: "postgresql",
    order: 2,
  },

  // Programming
  {
    name: "JavaScript",
    category: "Programming",
    level: 90,
    icon: "javascript",
    order: 1,
  },
  {
    name: "TypeScript",
    category: "Programming",
    level: 86,
    icon: "typescript",
    order: 2,
  },
  {
    name: "Python",
    category: "Programming",
    level: 88,
    icon: "python",
    order: 3,
  },

  // AI / ML
  {
    name: "Machine Learning",
    category: "AI / Machine Learning",
    level: 80,
    icon: "brain",
    order: 1,
  },
  {
    name: "Scikit-learn",
    category: "AI / Machine Learning",
    level: 82,
    icon: "scikit",
    order: 2,
  },
  {
    name: "TensorFlow",
    category: "AI / Machine Learning",
    level: 72,
    icon: "tensorflow",
    order: 3,
  },

  // Tools
  { name: "Git & GitHub", category: "Tools", level: 90, icon: "git", order: 1 },
  { name: "VS Code", category: "Tools", level: 95, icon: "vscode", order: 2 },
  { name: "Postman", category: "Tools", level: 88, icon: "postman", order: 3 },

  // DevOps
  {
    name: "Linux / Bash Scripting",
    category: "DevOps",
    level: 80,
    icon: "linux",
    order: 2,
  },
  {
    name: "CI/CD & Cloud Basics",
    category: "DevOps",
    level: 72,
    icon: "cloud",
    order: 3,
  },
];

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: "BLOG_APP-MERN_STACK-",
    fullName: "bob2056/BLOG_APP-MERN_STACK-",
    description:
      "Full-stack MERN blogging application with TypeScript, authentication, and REST APIs.",
    htmlUrl: "https://github.com/bob2056/BLOG_APP-MERN_STACK-",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ["mern", "react", "nodejs", "typescript", "mongodb"],
    fork: false,
  },
  {
    id: 102,
    name: "WEB_NOVELS",
    fullName: "bob2056/WEB_NOVELS",
    description:
      "Web novel platform and reader built with TypeScript and modern web technologies.",
    htmlUrl: "https://github.com/bob2056/WEB_NOVELS",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ["typescript", "react", "web-novels"],
    fork: false,
  },
  {
    id: 103,
    name: "Data-visualization-case-2-",
    fullName: "bob2056/Data-visualization-case-2-",
    description:
      "Data analytics, visualization, and machine learning case study in Python.",
    htmlUrl: "https://github.com/bob2056/Data-visualization-case-2-",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ["python", "data-science", "machine-learning", "visualization"],
    fork: false,
  },
  {
    id: 104,
    name: "Cloud-Demo",
    fullName: "bob2056/Cloud-Demo",
    description: "Cloud deployment and architecture demonstration repository.",
    htmlUrl: "https://github.com/bob2056/Cloud-Demo",
    language: "HTML",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ["cloud", "html", "deployment"],
    fork: false,
  },
  {
    id: 105,
    name: "colllegeapp",
    fullName: "bob2056/colllegeapp",
    description: "Academic college portal and management application.",
    htmlUrl: "https://github.com/bob2056/colllegeapp",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ["college-app", "web"],
    fork: false,
  },
];

export const FALLBACK_GITHUB_REPOS = FALLBACK_REPOS;
