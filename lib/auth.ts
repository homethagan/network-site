import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'netcloud2024';
const SESSION_SECRET = 'netcloud-session-secret';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin-session', SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === SESSION_SECRET;
}
