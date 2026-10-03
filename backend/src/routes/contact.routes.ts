import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from '../controllers/contact.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name must not exceed 100 characters'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('subject')
      .trim()
      .notEmpty()
      .withMessage('Subject is required')
      .isLength({ max: 200 })
      .withMessage('Subject must not exceed 200 characters'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 10, max: 5000 })
      .withMessage('Message must be between 10 and 5000 characters'),
  ],
  submitContact
);

router.get('/', authenticate, getContactMessages);
router.put('/:id/status', authenticate, updateContactStatus);
router.delete('/:id', authenticate, deleteContactMessage);

export default router;
