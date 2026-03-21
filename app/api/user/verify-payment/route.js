import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import crypto from 'crypto';
import connectDB from '../../../../lib/mongodb';
import Purchase from '../../../../models/Purchase';
import User from '../../../../models/User';
import Course from '../../../../models/Course';

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
    } = await req.json();

    // Verify signature
    const generated = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated !== razorpay_signature) {
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    await connectDB();

    // Update purchase
    const purchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      {
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    if (!purchase) {
      return NextResponse.json({
        success: false,
        message: 'Purchase not found',
      });
    }

    // update user using clerkId
    await User.findOneAndUpdate(
      { clerkId: purchase.userId },
      {
        $addToSet: { enrolledCourses: purchase.courseId }, // ✅ avoids duplicates
      }
    );

    // Course update is fine (courseId is ObjectId)
    await Course.findByIdAndUpdate(purchase.courseId, {
      $addToSet: { enrolledStudents: purchase.userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified. Course enrolled!',
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}