import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import Purchase from '../../../../models/Purchase';
import User from '../../../../models/User';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
 
    await connectDB();
 
    const courses      = await Course.find({ educator: userId });
    const totalCourses = courses.length;
 
    if (totalCourses === 0) {
      return NextResponse.json({
        success: true,
        dashboardData: { totalEarnings: 0, enrolledStudentsData: [], totalCourses: 0 },
      });
    }
 
    const courseIds = courses.map((c) => c._id);
    const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' });
    const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0);
 
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find({ enrolledCourses: course._id }, 'name imageUrl');
      students.forEach((student) => {
        enrolledStudentsData.push({ courseTitle: course.courseTitle, student });
      });
    }
 
    return NextResponse.json({
      success: true,
      dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
    });
  } catch (error) {
    console.error('[educator/dashboard]', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
 