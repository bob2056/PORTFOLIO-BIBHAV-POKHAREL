import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Bibhav Pokharel Portfolio Backend Server Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: any) => {
  console.error('[Server] Unhandled Rejection:', err?.message || err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: any) => {
  console.error('[Server] Uncaught Exception:', err?.message || err);
});
