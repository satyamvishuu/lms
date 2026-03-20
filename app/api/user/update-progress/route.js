import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import CourseProgress from '../../../../models/CourseProgress';

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { courseId, lectureId } = await req.json();
    await connectDB();

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (progress) {
      if (progress.lectureCompleted.includes(lectureId))
        return NextResponse.json({ success: true, message: 'Lecture Already Completed.' });
      progress.lectureCompleted.push(lectureId);
      await progress.save();
    } else {
      await CourseProgress.create({ userId, courseId, lectureCompleted: [lectureId] });
    }

    return NextResponse.json({ success: true, message: 'Progress Updated.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
