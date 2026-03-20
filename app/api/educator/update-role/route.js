// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import connectDB from '@/lib/mongodb';
// import User from '@/models/User';

// export async function POST() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const user = await User.findOneAndUpdate(
//       { clerkId: userId },
//       { role: 'educator' },
//       { new: true }
//     );

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'You can publish courses now.',
//     });

//   } catch (error) {
//     console.log("ERROR:", error.message);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


// // import { NextResponse } from "next/server";

// // export async function POST() {
// //   return NextResponse.json({ success: true });
// // }



import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { role: 'educator' },
      { new: true, upsert: true } // ✅ FIX
    );

    return NextResponse.json({
      success: true,
      message: 'You can publish courses now.',
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
