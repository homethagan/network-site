import { HeroSection, TopicsGrid, CTABanner } from '@/components/Home';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const recentPosts = getAllPosts(true).slice(0, 3);

  return (
    <main className="bg-[#EAEAE6]">
      <HeroSection />

      <section className="py-24 px-4 md:px-16 bg-[#EAEAE6]">
        <div className="flex justify-between items-end border-b-4 border-[#111] pb-6 mb-12">
          <h2 className="font-syne font-black text-5xl uppercase">Latest Intel</h2>
          <Link href="/blog" className="brutal-btn px-6 py-2 text-sm">View Archive &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
             <Link key={post.slug} href={`/blog/${post.slug}`} className="brutal-border bg-[#EAEAE6] flex flex-col overflow-hidden group">
               <div className="border-b-2 border-[#111] p-4 bg-[#FF3366] text-[#EAEAE6] flex justify-between font-bold uppercase tracking-widest">
                 <span>{post.category}</span>
                 <span>{post.readTime}</span>
               </div>
               <div className="p-8 flex flex-col flex-1 bg-white group-hover:bg-[#f4f4f4]">
                 <h3 className="font-syne font-black text-3xl uppercase leading-tight mb-4 group-hover:text-[#FF3366] transition-colors">{post.title}</h3>
                 <p className="text-[#111] font-medium mb-8 flex-1">{post.excerpt}</p>
                 <div className="font-bold text-sm uppercase tracking-widest pt-4 border-t-2 border-[#111]">
                   PUB: {new Date(post.date).toLocaleDateString()}
                 </div>
               </div>
             </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

