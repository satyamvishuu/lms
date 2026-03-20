import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find({ isPublished: true });

    // attach educator info manually
    const users = await User.find({
      clerkId: { $in: courses.map(c => c.educator) }
    });

    const result = courses.map(course => ({
      ...course._doc,
      educatorData: users.find(u => u.clerkId === course.educator),
    }));

    return NextResponse.json({
      success: true,
      courses: result,
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}