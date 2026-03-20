import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ success: false, message: 'Webhook secret not set' }, { status: 500 });
  }

  const svixId        = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');

  const body = await req.text();

  const wh = new Webhook(webhookSecret);
  let event;
  try {
    event = wh.verify(body, {
      'svix-id':        svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
  }

  await connectDB();
  const { data, type } = event;

  switch (type) {
    case 'user.created':
      await User.create({
        clerkId: data.id, // ✅ FIX
        email: data.email_addresses?.[0]?.email_address || "noemail@temp.com", // ✅ SAFE
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        imageUrl: data.image_url || "",
        enrolledCourses: [],
        role: "student",
      });
      break;

    case 'user.updated':
      await User.findByIdAndUpdate(data.id, {
        email:    data.email_addresses[0].email_address,
        name:     `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      });
      break;

    case 'user.deleted':
      await User.findByIdAndDelete(data.id);
      break;
  }

  return NextResponse.json({ success: true });
}
