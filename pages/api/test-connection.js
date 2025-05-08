import { connectToDatabase } from '@/lib/mongoose';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    // Attempt to connect to the database
    await connectToDatabase();
    
    // Check if connection is alive
    if (mongoose.connection.readyState === 1) {
      // Return success
      return res.status(200).json({ 
        status: 'success',
        message: 'Database connection established',
        database: mongoose.connection.name
      });
    } else {
      throw new Error('Database connection not ready');
    }
  } catch (error) {
    console.error('Database connection test failed:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Failed to connect to database',
      error: error.message
    });
  }
} 