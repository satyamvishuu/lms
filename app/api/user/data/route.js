import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // ✅ FIX HERE
    const user = await User.findOne({ clerkId: userId });

    // fallback if webhook not created user yet
    if (!user) {
      return NextResponse.json({
        success: true,
        user: {
          clerkId: userId,
          role: 'student',
          enrolledCourses: [],
        },
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}