import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
 
export async function getAuthUser() {
  const { userId } = await auth();
  return userId ?? null;
}
 
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: 'Unauthorized. Please sign in.' },
    { status: 401 }
  );
}