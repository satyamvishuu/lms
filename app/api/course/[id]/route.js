import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import User from '../../../../models/User';
import { auth } from '@clerk/nextjs/server';

export async function GET(req, context) {
  try {
    const { params } = await context;

    await connectDB();

    const { userId } = await auth();

    const course = await Course.findById(params.id);

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    // 👇 get educator
    const educator = await User.findOne({
      clerkId: course.educator,
    }).select('name imageUrl');

    // 👇 check enrollment
    let isEnrolled = false;

    if (userId) {
      const user = await User.findOne({ clerkId: userId });

      isEnrolled = user?.enrolledCourses?.some(
        (id) => id.toString() === params.id
      );
    }

    const courseObj = course.toObject();

    // 👇 MAIN FIX
    courseObj.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree && !isEnrolled) {
          lecture.lectureUrl = '';
        }
      });
    });

    return NextResponse.json({
      success: true,
      course: {
        ...courseObj,
        educatorData: educator,
      },
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}