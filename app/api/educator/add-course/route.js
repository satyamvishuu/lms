import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import cloudinary from '../../../../lib/cloudinary';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const imageFile  = formData.get('image');
    const courseData = JSON.parse(formData.get('courseData'));

    if (!imageFile)
      return NextResponse.json({ success: false, message: 'Thumbnail not attached.' });

    // Write temp file for Cloudinary upload
    const bytes  = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tmpPath = join(tmpdir(), `thumb_${Date.now()}_${imageFile.name}`);
    await writeFile(tmpPath, buffer);

    const uploadResult = await cloudinary.uploader.upload(tmpPath);

    await connectDB();
    await Course.create({
      ...courseData,
      educator: userId,
      courseThumbnail: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, message: 'Course Added!' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
