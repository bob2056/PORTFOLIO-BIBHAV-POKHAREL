import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { Admin } from '../models/Admin';
import { AuthRequest } from '../middleware/auth.middleware';

const generateToken = (id: string, email: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'bibhav_secret_jwt_token_auth_key_2026_portfolio';
  return jwt.sign({ id, email, role }, secret, {
    expiresIn: '7d',
  });
};

// POST /api/auth/login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email, password } = req.body;

    // Check if any admin exists in database, if none, create default admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      // First-time setup auto-provisioning
      const defaultAdmin = new Admin({
        email: email.toLowerCase().trim(),
        password,
        role: 'admin',
      });
      await defaultAdmin.save();

      const token = generateToken(
        defaultAdmin._id.toString(),
        defaultAdmin.email,
        defaultAdmin.role
      );

      res.status(200).json({
        success: true,
        message: 'Initial admin account created and authenticated.',
        token,
        user: {
          id: defaultAdmin._id,
          email: defaultAdmin.email,
          role: defaultAdmin.role,
        },
      });
      return;
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.',
      });
      return;
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.',
      });
      return;
    }

    const token = generateToken(admin._id.toString(), admin.email, admin.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me (Protected)
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
