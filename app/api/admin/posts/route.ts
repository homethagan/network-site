import { isAdminAuthenticated } from '@/lib/auth';
import { getAllPosts, savePost, getPostBySlug, deletePost } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = getAllPosts(false); // Include unpublished
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await request.json();
    savePost(post);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}
