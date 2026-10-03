import { Router, Request, Response, NextFunction } from 'express';
import { GitHubService } from '../services/github.service';

const router = Router();

// GET /api/github/repos
router.get('/repos', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const language = typeof req.query.language === 'string' ? req.query.language : undefined;
    const repos = await GitHubService.getUserRepos(language);
    res.status(200).json({
      success: true,
      count: repos.length,
      data: repos,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
