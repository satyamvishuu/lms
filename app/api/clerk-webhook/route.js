import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Webhook secret not set');
    }

    // ✅ Get headers
    const svixId = req.headers.get('svix-id');
    const svixTimestamp = req.headers.get('svix-timestamp');
    const svixSignature = req.headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { success: false, message: 'Missing svix headers' },
        { status: 400 }
      );
    }

    // ✅ IMPORTANT: raw body
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
      console.error("❌ Signature Error:", err.message);
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    await connectDB();

    const { data, type } = event;

    // ✅ Extract email safely
    const email = data?.email_addresses?.[0]?.email_address;

    // ✅ Common user object
    const userData = {
      clerkId: data.id,
      email: email || undefined, // ❌ no fake email
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      imageUrl: data.image_url || "",
      role: "student",
    };

    switch (type) {

      // ✅ CREATE + UPDATE (UPSERT SAFE)
      case 'user.created':
      case 'user.updated':

        // skip if no email (important)
        if (!email) {
          console.log("⚠️ No email found, skipping...");
          return NextResponse.json({ success: true });
        }

        await User.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          }
        );
        break;

      // ✅ DELETE (SAFE)
      case 'user.deleted':
        await User.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        console.log("Unhandled event type:", type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("🔥 Webhook error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}