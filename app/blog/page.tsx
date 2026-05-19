import { getAllPosts, getCategories } from '@/lib/posts';
import Link from 'next/link';
import ClientBlogFilters from '@/components/ClientBlogFilters';

export default function BlogPage() {
  const allPosts = getAllPosts(true);
  const categories = getCategories();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 border-b-4 border-[#111]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-8 px-6 py-3 bg-[#FF3366] border-2 border-[#111]">
              <span className="font-syne font-black text-sm uppercase tracking-widest text-[#EAEAE6]">
                KNOWLEDGE HUB
              </span>
            </div>
            <h1 className="font-syne font-black text-6xl md:text-7xl mb-6 uppercase text-[#111] leading-tight">
              MASTER<br/>MODERN<br/>INFRASTRUCTURE
            </h1>
            <p className="text-lg font-bold text-[#111] max-w-2xl mb-8 tracking-wide">
              Raw, unfiltered tutorials on networking, DevOps, cloud computing, and infrastructure architecture. Drop the generic courses. Build real systems.
            </p>
            <div className="h-1 w-32 bg-[#FF3366]"></div>
          </div>
        </div>
      </section>

      <ClientBlogFilters posts={allPosts} categories={categories} />
    </div>
  );
}
