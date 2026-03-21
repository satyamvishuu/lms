import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found. Please login again.' },
        { status: 404 }
      );
    }

    await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: { role: 'educator' } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'You can publish courses now.',
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}