'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  onLogout?: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/admin/posts', label: 'Posts', icon: '📝' },
    { href: '/admin/new-post', label: 'New Post', icon: '➕' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center border-2 border-[#111] bg-[#FF3366]"
        style={{
          background: '#FF3366',
          borderColor: '#111111',
        }}>
        <span className="text-white font-bold text-lg">{isOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 h-screen overflow-y-auto border-r-2 bg-[#EAEAE6] transition-transform duration-300 ${
          !isMobile ? 'translate-x-0' : isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          borderRightColor: '#111111',
          paddingTop: '64px',
          zIndex: 40,
        }}>
        <div className="p-6">
          <h2 className="font-syne font-black text-lg mb-8 uppercase text-[#111]">Admin Panel</h2>

          <nav className="space-y-2 mb-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-none transition font-bold uppercase tracking-widest text-sm"
                style={{
                  background: isActive(item.href) ? '#FF3366' : 'transparent',
                  color: isActive(item.href) ? '#EAEAE6' : '#111111',
                  border: '2px solid #111111',
                  marginBottom: '4px',
                }}
                onClick={() => isMobile && setIsOpen(false)}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t-2 border-[#111] pt-6">
            <button
              onClick={onLogout}
              className="w-full px-4 py-3 font-bold uppercase tracking-widest text-sm transition"
              style={{
                background: '#111111',
                color: '#EAEAE6',
                border: '2px solid #111111',
              }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
