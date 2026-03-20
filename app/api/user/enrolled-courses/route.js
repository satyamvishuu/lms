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

    const userData = await User.findOne({ clerkId: userId })
      .populate('enrolledCourses');

    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'User not found in DB' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enrolledCourses: userData.enrolledCourses?.reverse() || [],
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}