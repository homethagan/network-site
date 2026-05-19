import { clearAdminSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
