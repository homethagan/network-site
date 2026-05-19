'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Post } from '@/lib/posts';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    excerpt: '',
    category: '',
    tags: [],
    author: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    published: false,
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate slug from title
      const slug = formData.title
        ?.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() || 'post';

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          ...formData,
        }),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else if (response.status === 401) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
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
        <h1 className="font-syne font-black text-4xl md:text-5xl mb-8 md:mb-12 uppercase text-[#111] border-b-4 border-[#111] pb-6">Create New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="Post title"
                  required
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  placeholder="Brief summary of the post"
                  rows={3}
                  required
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Content *</label>
                <MarkdownEditor
                  value={formData.content || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Category *</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111]"
                >
                  <option value="">Select category</option>
                  <option value="Networking">Networking</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111]"
                />
              </div>

              {/* Read Time */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime || ''}
                  onChange={handleChange}
                  placeholder="e.g., 5 min read"
                  className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 border-2 border-[#111] bg-[#111] text-[#EAEAE6] font-bold uppercase tracking-widest hover:bg-[#FF3366] transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF3366] text-[#EAEAE6] border-2 border-[#111] font-bold text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(i)}
                        className="hover:text-[#111] font-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Published */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published || false}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-[#111] cursor-pointer"
                  />
                  <span className="font-bold text-sm uppercase text-[#111]">Publish immediately</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="brutal-btn px-6 py-3 w-full text-sm font-bold"
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 w-full border-2 border-[#111] bg-white text-[#111] font-bold uppercase tracking-widest hover:bg-[#111] hover:text-[#EAEAE6] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
