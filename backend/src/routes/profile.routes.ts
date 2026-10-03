import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
} from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticate, upload.single('image'), updateProfile);
router.post('/upload-photo', authenticate, upload.single('image'), uploadProfilePhoto);

export default router;
