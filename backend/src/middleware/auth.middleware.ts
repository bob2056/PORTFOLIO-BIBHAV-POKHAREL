import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";
import { getJwtSecret } from "../config/jwt";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authorization denied. No token provided.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization token. User not found.",
      });
      return;
    }

    req.user = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
      return;
    }
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};
