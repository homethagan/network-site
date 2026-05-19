'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#EAEAE6]">
      <div className="grid-bg"></div>
      <div className="flex flex-col md:flex-row min-h-[85vh]">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-[#111] bg-[#EAEAE6]">
          <div className="inline-block border-2 border-[#111] px-4 py-1 font-bold uppercase tracking-widest w-max mb-8 bg-[#111] text-[#EAEAE6]">
            V_2.0 // DEPLOYED
          </div>
          <h1 className="font-syne text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
            Build The <span className="text-[#FF3366]">Future</span> of the Web.
          </h1>
          <p className="text-xl font-medium max-w-lg mb-10 text-[#333]">
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
      
      {/* Enhanced Marquee with Gradient Background */}
      <div className="relative border-t-4 border-b-4 border-[#111]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#1a1a2e] to-[#111]"></div>
        <div className="relative marquee-container-enhanced">
          <div className="marquee-content-enhanced">
            TCP/IP • BGP • KUBERNETES • AWS • TERRAFORM • DOCKER • LINUX • NGINX • SYSTEMD • GIT • ANSIBLE • PROMETHEUS • GRAFANA • TCP/IP • BGP • KUBERNETES • AWS • TERRAFORM • DOCKER • LINUX • NGINX • SYSTEMD • GIT • ANSIBLE • PROMETHEUS • GRAFANA •
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-4 border-[#111]">
        <div className="p-8 md:p-12 border-r-2 border-b-2 md:border-b-0 border-[#111] hover:bg-[#f5f5f0] transition-colors">
          <div className="font-syne text-4xl font-black mb-4 text-[#FF3366]">⚡</div>
          <h3 className="font-syne font-bold text-2xl mb-2 uppercase">Production Ready</h3>
          <p className="text-[#333] font-medium">Real-world infrastructure patterns you can deploy today.</p>
        </div>
        <div className="p-8 md:p-12 border-r-2 border-b-2 md:border-b-0 border-[#111] hover:bg-[#f5f5f0] transition-colors">
          <div className="font-syne text-4xl font-black mb-4 text-[#FF3366]">🔧</div>
          <h3 className="font-syne font-bold text-2xl mb-2 uppercase">No BS Content</h3>
          <p className="text-[#333] font-medium">Skip the theory. Deep dives into actual tools and technologies.</p>
        </div>
        <div className="p-8 md:p-12 border-b-2 md:border-b-0 border-[#111] hover:bg-[#f5f5f0] transition-colors">
          <div className="font-syne text-4xl font-black mb-4 text-[#FF3366]">📈</div>
          <h3 className="font-syne font-bold text-2xl mb-2 uppercase">Stay Ahead</h3>
          <p className="text-[#333] font-medium">Latest DevOps & infrastructure trends, constantly updated.</p>
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

