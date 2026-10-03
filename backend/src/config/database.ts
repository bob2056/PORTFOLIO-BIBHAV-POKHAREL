import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bibhav_portfolio';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('[MongoDB] Connection error:', error instanceof Error ? error.message : error);
    console.warn('[MongoDB] Note: Backend will continue running. Please make sure MongoDB is running or check your MONGODB_URI.');
  }
};
