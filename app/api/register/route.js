import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import User from '@/models/User';
import connectDB from '@/config/database';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Ensure database connection
    await connectDB();

    // Parse request body
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            existingUser.email === email
              ? 'Email already exists'
              : 'Username already exists',
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      provider: 'credentials',
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}
