'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#EAEAE6] border-b-2 border-[#111]">
      <div className="flex items-stretch h-20">
        <Link href="/" className="flex items-center px-8 border-r-2 border-[#111] bg-[#FF3366] text-[#EAEAE6] group overflow-hidden relative">
          <span className="font-syne font-black text-2xl uppercase tracking-tighter z-10">NETCLOUD</span>
          <div className="absolute inset-0 bg-[#111] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>

        <div className="hidden md:flex flex-1">
          <Link href="/blog" className="flex items-center px-8 border-r-2 border-[#111] font-bold uppercase tracking-widest hover:bg-[#111] hover:text-[#EAEAE6] transition-colors">Articles</Link>
          <Link href="/about" className="flex items-center px-8 border-r-2 border-[#111] font-bold uppercase tracking-widest hover:bg-[#111] hover:text-[#EAEAE6] transition-colors">Directory</Link>
          <div className="flex-1"></div>
          <Link href="/admin" className="flex items-center px-8 border-l-2 border-[#111] font-bold uppercase tracking-widest hover:bg-[#FF3366] hover:text-[#EAEAE6] transition-colors">Terminal</Link>
        </div>
      </div>
    </nav>
  );
}

