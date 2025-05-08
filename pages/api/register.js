import { connectToDatabase } from '@/lib/mongoose';
import { hash } from 'bcryptjs';
import User from '@/models/User';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Connect to the database
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 12);
    
    // Create user
    const user = await User.create({
      email,
      password: hashedPassword
    });
    
    // Return success without exposing sensitive data
    return res.status(201).json({ 
      message: 'User created successfully',
      userId: user._id 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 