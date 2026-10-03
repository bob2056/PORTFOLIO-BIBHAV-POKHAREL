import { Router } from 'express';
import { body } from 'express-validator';
import { login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Please provide a valid email address'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/me', authenticate, getMe);

export default router;
