import axios from 'axios';

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

// Fallback repositories for offline resilience or rate-limiting
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'BLOG_APP-MERN_STACK-',
    fullName: 'bob2056/BLOG_APP-MERN_STACK-',
    description: 'Full-stack MERN blogging application with TypeScript, authentication, and REST APIs.',
    htmlUrl: 'https://github.com/bob2056/BLOG_APP-MERN_STACK-',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ['mern', 'react', 'nodejs', 'typescript', 'mongodb'],
    fork: false,
  },
  {
    id: 102,
    name: 'WEB_NOVELS',
    fullName: 'bob2056/WEB_NOVELS',
    description: 'Web novel platform and reader built with TypeScript and modern web technologies.',
    htmlUrl: 'https://github.com/bob2056/WEB_NOVELS',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ['typescript', 'react', 'web-novels'],
    fork: false,
  },
  {
    id: 103,
    name: 'Data-visualization-case-2-',
    fullName: 'bob2056/Data-visualization-case-2-',
    description: 'Data analytics, visualization, and machine learning case study in Python.',
    htmlUrl: 'https://github.com/bob2056/Data-visualization-case-2-',
    language: 'Python',
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ['python', 'data-science', 'machine-learning', 'visualization'],
    fork: false,
  },
  {
    id: 104,
    name: 'Cloud-Demo',
    fullName: 'bob2056/Cloud-Demo',
    description: 'Cloud deployment and architecture demonstration repository.',
    htmlUrl: 'https://github.com/bob2056/Cloud-Demo',
    language: 'HTML',
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ['cloud', 'html', 'deployment'],
    fork: false,
  },
  {
    id: 105,
    name: 'colllegeapp',
    fullName: 'bob2056/colllegeapp',
    description: 'Academic college portal and management application.',
    htmlUrl: 'https://github.com/bob2056/colllegeapp',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    homepage: null,
    topics: ['college-app', 'web'],
    fork: false,
  },
];

export class GitHubService {
  private static username = process.env.GITHUB_USERNAME || 'bob2056';

  public static async getUserRepos(language?: string): Promise<GitHubRepo[]> {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Bibhav-Portfolio-Backend',
      };

      if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim() !== '') {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN.trim()}`;
      }

      const response = await axios.get(
        `https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`,
        { headers, timeout: 8000 }
      );

      if (!Array.isArray(response.data)) {
        return FALLBACK_REPOS;
      }

      let repos: GitHubRepo[] = response.data
        .filter((r: any) => !r.fork)
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description || 'Project repository by Bibhav Pokharel',
          htmlUrl: r.html_url,
          language: r.language || 'Code',
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          homepage: r.homepage,
          topics: r.topics || [],
          fork: r.fork,
        }));

      if (language && language.toLowerCase() !== 'all') {
        repos = repos.filter(
          (repo) => repo.language?.toLowerCase() === language.toLowerCase()
        );
      }

      return repos.length > 0 ? repos : FALLBACK_REPOS;
    } catch (error) {
      console.warn(
        `[GitHubService] Error fetching repositories from GitHub API: ${
          error instanceof Error ? error.message : error
        }. Using fallback cache.`
      );
      if (language && language.toLowerCase() !== 'all') {
        return FALLBACK_REPOS.filter(
          (repo) => repo.language?.toLowerCase() === language.toLowerCase()
        );
      }
      return FALLBACK_REPOS;
    }
  }
}
