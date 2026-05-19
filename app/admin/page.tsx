'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-[#EAEAE6]">
      <div className="w-full max-w-md px-4">
        <div className="brutal-border bg-white p-12">
          <h1 className="font-syne font-black text-4xl mb-2 uppercase text-[#111]">Admin Terminal</h1>
          <p className="text-sm mb-8 font-bold text-[#111]">
            Enter your admin password to continue
          </p>

          {error && (
            <div 
              className="mb-6 p-4 border-2 border-[#FF3366] bg-[#FF3366] text-[#EAEAE6] font-bold text-sm"
              style={{
              }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold text-xs uppercase mb-3 text-[#111]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-[#111] font-bold text-[#111] placeholder-gray-400"
              />
            </div>

            <button 
              type="submit" 
              className="brutal-btn px-6 py-3 w-full text-sm font-bold"
              disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-center mt-6 font-bold uppercase tracking-widest text-[#111]">
            Default password: netcloud2024
          </p>
        </div>
      </div>
    </div>
  );
}
