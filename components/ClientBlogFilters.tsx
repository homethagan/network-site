'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface ClientBlogFiltersProps {
  posts: Post[];
  categories: string[];
}

export default function ClientBlogFilters({ posts, categories }: ClientBlogFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      {/* Category Filter - Redesigned */}
      <section className="py-16 bg-[#EAEAE6] border-b-4 border-[#111]">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="font-syne font-black text-2xl uppercase text-[#111] mb-4">FILTER BY EXPERTISE</h3>
            <div className="h-1 w-12 bg-[#FF3366]"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 transition transform hover:translate-x-1 ${
                selectedCategory === null
                  ? 'bg-[#FF3366] text-[#EAEAE6] border-[#111]'
                  : 'bg-white text-[#111] border-[#111] hover:bg-[#111] hover:text-[#EAEAE6]'
              }`}
              style={{
                boxShadow: selectedCategory === null ? '3px 3px 0px #111' : '2px 2px 0px #111'
              }}
            >
              ALL TOPICS
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 transition transform hover:translate-x-1 ${
                  selectedCategory === category
                    ? 'bg-[#FF3366] text-[#EAEAE6] border-[#111]'
                    : 'bg-white text-[#111] border-[#111] hover:bg-[#111] hover:text-[#EAEAE6]'
                }`}
                style={{
                  boxShadow: selectedCategory === category ? '3px 3px 0px #111' : '2px 2px 0px #111'
                }}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => {
                const isAlternate = i % 3 === 1; // Alternate some cards
                const isLarge = i % 5 === 0; // Make some cards larger

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div
                      className={`group brutal-border bg-white overflow-hidden h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        isLarge ? 'md:col-span-1 md:row-span-2' : ''
                      }`}
                      style={{
                        borderColor: '#111',
                        borderWidth: '2px',
                        boxShadow: '4px 4px 0px #111'
                      }}
                    >
                      {/* Category Tag */}
                      <div className="p-6 pb-0">
                        <div className="inline-block mb-4 px-4 py-2 bg-[#FF3366] border-2 border-[#111]">
                          <span className="font-syne font-black text-xs uppercase tracking-widest text-[#EAEAE6]">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-full">
                        {/* Title */}
                        <h3
                          className={`font-syne font-black uppercase mb-4 text-[#111] leading-tight transition-colors group-hover:text-[#FF3366] ${
                            isLarge ? 'text-3xl' : 'text-2xl'
                          }`}
                        >
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#111] mb-6 flex-1 font-medium leading-relaxed text-sm">
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="border-t-2 border-[#111] pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-xs uppercase tracking-widest text-[#111]">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <span className="font-bold text-xs uppercase tracking-widest bg-[#111] text-[#EAEAE6] px-3 py-1">
                              {post.readTime}
                            </span>
                          </div>

                          {/* Read Button */}
                          <div className="flex items-center justify-between pt-2 border-t-2 border-[#111]">
                            <span className="font-syne font-black text-[#FF3366] uppercase text-sm">READ ARTICLE</span>
                            <span className="font-black text-[#FF3366] text-xl group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 border-4 border-[#111] bg-[#EAEAE6]">
              <p className="font-bold text-2xl uppercase text-[#111] mb-4">
                NO ARTICLES FOUND
              </p>
              <p className="font-bold text-[#111]">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
