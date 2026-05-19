'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import Link from 'next/link';
import { Post } from '@/lib/posts';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else if (response.status === 401) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.slug !== slug));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#EAEAE6]">
      <AdminSidebar onLogout={handleLogout} />

      <div className="md:ml-64 p-4 md:p-12 pt-16 md:pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b-4 border-[#111] pb-6 gap-4">
          <h1 className="font-syne font-black text-4xl md:text-5xl uppercase text-[#111] break-words">Posts</h1>
          <Link href="/admin/new-post" className="brutal-btn px-6 py-3 text-sm whitespace-nowrap">
            Create New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Posts', value: posts.length },
            { label: 'Published', value: posts.filter(p => p.published).length },
            { label: 'Drafts', value: posts.filter(p => !p.published).length },
          ].map((stat, i) => (
            <div key={i} className="brutal-border bg-white p-8">
              <div className="font-syne font-black text-5xl text-[#FF3366] mb-4">
                {stat.value}
              </div>
              <div className="font-bold text-xs uppercase tracking-widest text-[#111]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Posts Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="font-bold text-[#111]">Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="brutal-border bg-white p-12 text-center">
            <p className="mb-4 font-bold text-[#111]">
              No posts yet. Create your first post to get started.
            </p>
            <Link href="/admin/new-post" className="brutal-btn px-6 py-3 text-sm">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="brutal-border bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FF3366] border-b-2 border-[#111]">
                    <th className="px-6 py-4 text-left font-bold text-xs uppercase text-[#EAEAE6]">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-xs uppercase text-[#EAEAE6]">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-xs uppercase text-[#EAEAE6]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-xs uppercase text-[#EAEAE6]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-xs uppercase text-[#EAEAE6]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr
                      key={post.slug}
                      className="border-b-2 border-[#111]"
                      style={{
                        background: i % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                      }}>
                      <td className="px-6 py-4 font-syne font-bold text-[#111]">{post.title}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#111]">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#111]">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 text-xs font-bold uppercase"
                          style={{
                            background: post.published ? '#FF3366' : '#111111',
                            color: post.published ? '#EAEAE6' : '#EAEAE6',
                            border: '2px solid #111111',
                          }}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/edit-post/${post.slug}`}
                            className="font-bold uppercase tracking-widest hover:text-[#FF3366] transition">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.slug)}
                            className="font-bold uppercase tracking-widest text-[#FF3366] hover:text-[#111] transition">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
