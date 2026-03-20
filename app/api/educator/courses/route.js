import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const courses = await Course.find({ educator: userId });
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
