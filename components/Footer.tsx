import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#111] bg-[#111] text-[#EAEAE6] mt-20">
      <div className="marquee-container border-none !bg-[#FF3366] !text-[#111]">
        <div className="marquee-content">
          NETWORK • CLOUD • SECURITY • DEVOPS • INFRASTRUCTURE • NETWORK • CLOUD • SECURITY • DEVOPS • INFRASTRUCTURE •
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-[#EAEAE6]/20">
        <div className="p-12 border-b-2 md:border-b-0 md:border-r-2 border-[#EAEAE6]/20">
          <h2 className="font-syne text-5xl font-black uppercase mb-6">NetCloud<br/>Academy.</h2>
          <p className="max-w-md text-gray-400 font-medium">
            Radical education for the modern cloud infrastructure engineer. No fluff. Just raw architecture.
          </p>
        </div>
        <div className="p-12 grid grid-cols-2 gap-8">
          <div>
             <h4 className="font-bold text-xl uppercase mb-6 text-[#FF3366]">Index</h4>
             <ul className="space-y-4 font-bold uppercase tracking-widest text-sm">
               <li><Link href="/blog" className="hover:text-[#FF3366] transition-colors">Articles</Link></li>
               <li><Link href="/about" className="hover:text-[#FF3366] transition-colors">About</Link></li>
               <li><Link href="/contact" className="hover:text-[#FF3366] transition-colors">Contact</Link></li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold text-xl uppercase mb-6 text-[#FF3366]">Social</h4>
             <ul className="space-y-4 font-bold uppercase tracking-widest text-sm">
               <li><a href="#" className="hover:text-[#FF3366] transition-colors">Github</a></li>
               <li><a href="#" className="hover:text-[#FF3366] transition-colors">Twitter</a></li>
               <li><a href="#" className="hover:text-[#FF3366] transition-colors">Discord</a></li>
             </ul>
          </div>
        </div>
      </div>
      <div className="p-8 border-t-2 border-[#EAEAE6]/20 text-center font-bold text-sm uppercase">
        © {new Date().getFullYear()} NetCloud Academy
      </div>
    </footer>
  );
}

