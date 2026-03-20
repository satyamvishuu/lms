import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import Purchase from '../../../../models/Purchase';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const courses   = await Course.find({ educator: userId });
    const courseIds = courses.map((c) => c._id);

    const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' })
      .populate('userId',   'name email imageUrl')
      .populate('courseId', 'courseTitle');

    const enrolledStudents = purchases.map((p) => ({
      student:      p.userId,
      courseTitle:  p.courseId?.courseTitle,
      purchaseDate: p.createdAt,
    }));

    return NextResponse.json({ success: true, enrolledStudents });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
