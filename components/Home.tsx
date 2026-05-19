'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b-2 border-[#111] bg-[#EAEAE6]">
      <div className="grid-bg"></div>
      <div className="flex flex-col md:flex-row min-h-[85vh]">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-[#111] bg-[#EAEAE6]">
          <div className="inline-block border-2 border-[#111] px-4 py-1 font-bold uppercase tracking-widest w-max mb-8 bg-[#111] text-[#EAEAE6]">
            V_2.0 // DEPLOYED
          </div>
          <h1 className="font-syne text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
            Build The <span className="text-[#FF3366]">Future</span> of the Web.
          </h1>
          <p className="text-xl font-medium max-w-lg mb-10">
            Raw, unfiltered tutorials on modern networking, devops, and cloud infrastructure. Drop the generic courses. Build real systems.
          </p>
          <div className="flex gap-4">
            <Link href="/blog" className="brutal-btn px-8 py-4 text-xl">Start Reading</Link>
          </div>
        </div>
        <div className="md:w-1/3 bg-[#FF3366] p-8 flex border-l-2 border-[#111] flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="font-syne text-8xl font-black text-[#111] leading-none mb-4">150+</div>
            <div className="font-bold text-xl uppercase tracking-widest text-[#EAEAE6] border-t-2 border-[#111] pt-4">Deep-Dive Modules</div>
          </div>
          <div className="relative z-10 mt-12 md:mt-0">
            <div className="font-syne text-8xl font-black text-[#111] leading-none mb-4">2K</div>
            <div className="font-bold text-xl uppercase tracking-widest text-[#EAEAE6] border-t-2 border-[#111] pt-4">Engineers Trained</div>
          </div>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          TCP/IP • BGP • KUBERNETES • AWS • TERRAFORM • DOCKER • LINUX • TCP/IP • BGP • KUBERNETES • AWS • TERRAFORM • DOCKER • LINUX • 
        </div>
      </div>
    </section>
  );
}

export function TopicsGrid() {
  return null;
}

export function CTABanner() {
  return null;
}

