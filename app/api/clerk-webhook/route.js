import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { success: false, message: 'Webhook secret not set' },
        { status: 500 }
      );
    }

    const svixId = req.headers.get('svix-id');
    const svixTimestamp = req.headers.get('svix-timestamp');
    const svixSignature = req.headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { success: false, message: 'Missing svix headers' },
        { status: 400 }
      );
    }

    const body = await req.text();

    const wh = new Webhook(webhookSecret);

    let event;
    try {
      event = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    await connectDB();

    const { data, type } = event;

    // ✅ Extract email safely
    const email = data.email_addresses?.[0]?.email_address;

    switch (type) {
      case 'user.created':
      case 'user.updated':
        if (!email) {
          console.log("⚠️ No email found, skipping user");
          break;
        }

        await User.findOneAndUpdate(
          { clerkId: data.id }, // ✅ correct lookup
          {
            clerkId: data.id,
            email,
            name: `${data.first_name || ""} ${data.last_name || ""}`,
            imageUrl: data.image_url || "",
            role: "student",
          },
          { upsert: true, new: true }
        );
        break;

      case 'user.deleted':
        await User.findOneAndDelete({ clerkId: data.id }); // ✅ correct delete
        break;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}