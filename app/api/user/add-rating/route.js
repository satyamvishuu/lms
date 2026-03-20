import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import User from '../../../../models/User';

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { courseId, rating } = await req.json();

    if (!courseId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({
        success: false,
        message: 'Invalid rating data.',
      });
    }

    await connectDB();

    const course = await Course.findById(courseId);
    const user = await User.findOne({ clerkId: userId }); // ✅ FIX

    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found.' });
    }

    // ✅ FIX enrollment check
    const isEnrolled = user?.enrolledCourses?.some(
      (id) => id.toString() === courseId
    );

    if (!user || !isEnrolled) {
      return NextResponse.json({
        success: false,
        message: 'User not enrolled in this course.',
      });
    }

    // ✅ rating logic
    const existingIdx = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );

    if (existingIdx > -1) {
      course.courseRatings[existingIdx].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    return NextResponse.json({
      success: true,
      message: 'Rating Added.',
    });

  } catch (error) {
    console.log("RATING ERROR:", error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}