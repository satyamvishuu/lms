import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Razorpay from 'razorpay';
import connectDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import User from '../../../../models/User';
import Purchase from '../../../../models/Purchase';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { courseId } = await req.json();

    await connectDB();

    const course = await Course.findById(courseId);
    const userData = await User.findOne({ clerkId: userId }); // ✅ FIX

    if (!course || !userData) {
      return NextResponse.json({
        success: false,
        message: 'Course or User not found.',
      });
    }

    // ✅ FIX enrollment check
    const alreadyEnrolled = userData.enrolledCourses.some(
      (id) => id.toString() === courseId
    );

    if (alreadyEnrolled) {
      return NextResponse.json({
        success: false,
        message: 'Already enrolled in this course.',
      });
    }

    const discountedPrice =
      course.coursePrice - (course.discount * course.coursePrice) / 100;

    const amountInPaise = Math.round(discountedPrice * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { courseId, userId },
    });

    const purchase = await Purchase.create({
      courseId,
      userId,
      amount: discountedPrice,
      status: 'pending',
      razorpayOrderId: order.id,
    });

    return NextResponse.json({
      success: true,
      order,
      purchaseId: purchase._id.toString(),
      keyId: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}