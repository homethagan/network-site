import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import '@/styles/article.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | NetCloud Academy',
      description: 'The post you are looking for does not exist.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const keywords = [post.category, ...post.tags, 'cloud computing', 'networking', 'devops'].join(', ');

  return {
    title: `${post.title} | NetCloud Academy`,
    description: post.excerpt,
    keywords: keywords,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'NetCloud Academy',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      siteName: 'NetCloud Academy',
      locale: 'en_US',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${baseUrl}/og-post.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/og-post.jpg`],
      creator: post.author,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(true);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAEAE6]">
        <div className="text-center">
          <h1 className="font-syne font-bold text-4xl mb-4">Post Not Found</h1>
          <p className="text-[#555] mb-8">
            The post you're looking for doesn't exist.
          </p>
          <Link href="/blog" className="inline-block border-2 border-[#111] px-6 py-3 font-bold uppercase bg-[#FF3366] text-white">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const htmlContent = await markdownToHtml(post.content);
  const allPosts = getAllPosts(true);
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="bg-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com'}/og-post.jpg`,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'HomeThagan - NetCloud Academy',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://homethagan.com'}/logo.png`,
              },
            },
            keywords: post.tags.join(', '),
            articleBody: htmlContent.replace(/<[^>]*>/g, '').substring(0, 1000),
          }),
        }}
      />

      {/* Featured Image */}
      <div className="w-full h-96 bg-gradient-to-r from-[#FF3366] to-[#0E7490] flex items-center justify-center border-b-4 border-[#111]">
        <div className="text-center">
          <div className="font-syne text-9xl font-black text-white opacity-30 mb-4">
            {post.category.substring(0, 3).toUpperCase()}
          </div>
          <p className="text-white text-lg font-bold">{post.category}</p>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0E7490] mb-4">
                <span className="inline-block border border-[#0E7490] px-3 py-1">{post.category}</span>
              </div>

              <h1 className="font-syne font-black text-5xl md:text-6xl text-[#111] mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-[#666] italic mb-6">
                {post.excerpt}
              </p>

              {/* Post Meta */}
              <div className="flex flex-wrap gap-6 text-sm font-medium border-t border-b border-[#ddd] py-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111]">By</span>
                  <span className="text-[#0E7490]">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111]">On</span>
                  <time className="text-[#555]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111]">Reading Time</span>
                  <span className="text-[#555]">{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <article 
              className="prose-article mb-12 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="border-t-2 border-[#ddd] pt-8 mb-8">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block border border-[#111] px-4 py-2 text-sm font-bold uppercase hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Post Navigation */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t-2 border-[#ddd]">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group text-left">
                    <div className="text-xs font-bold uppercase text-[#0E7490] mb-2">← Previous Post</div>
                    <h3 className="font-syne font-bold text-xl text-[#111] group-hover:text-[#FF3366] transition">
                      {prevPost.title}
                    </h3>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group text-right md:text-left">
                    <div className="text-xs font-bold uppercase text-[#FF3366] mb-2">Next Post →</div>
                    <h3 className="font-syne font-bold text-xl text-[#111] group-hover:text-[#0E7490] transition">
                      {nextPost.title}
                    </h3>
                  </Link>
                ) : <div />}
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            {/* Author Box */}
            <div className="border-2 border-[#111] p-6 mb-8 bg-[#F9F9F9]">
              <h3 className="font-syne font-bold text-xl text-[#111] mb-4 uppercase">About the Author</h3>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF3366] to-[#0E7490] flex items-center justify-center mx-auto mb-4">
                <span className="font-syne font-black text-3xl text-white">{post.author.charAt(0)}</span>
              </div>
              <h4 className="font-bold text-center text-[#111] mb-3">{post.author}</h4>
              <p className="text-sm text-[#666] text-center">
                Expert in networking, cloud infrastructure, and DevOps. Passionate about building scalable systems.
              </p>
            </div>

            {/* Post Info Box */}
            <div className="border-2 border-[#111] p-6 bg-[#F9F9F9]">
              <h3 className="font-syne font-bold text-xl text-[#111] mb-4 uppercase">Post Info</h3>
              <div className="space-y-4 text-sm">
                <div className="border-b border-[#ddd] pb-3">
                  <div className="font-bold text-[#111] text-xs uppercase mb-1">Category</div>
                  <div className="text-[#0E7490]">{post.category}</div>
                </div>
                <div className="border-b border-[#ddd] pb-3">
                  <div className="font-bold text-[#111] text-xs uppercase mb-1">Published</div>
                  <div className="text-[#555]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#111] text-xs uppercase mb-1">Read Time</div>
                  <div className="text-[#555]">{post.readTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-[#F9F9F9] border-t-4 border-[#111] py-12">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <h2 className="font-syne font-black text-4xl text-[#111] mb-8 uppercase">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                <div className="border-2 border-[#111] overflow-hidden bg-white hover:shadow-lg transition">
                  <div className="bg-gradient-to-r from-[#FF3366] to-[#0E7490] h-40 flex items-center justify-center">
                    <span className="font-syne font-black text-6xl text-white opacity-20">
                      {relatedPost.category.charAt(0)}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase text-[#0E7490] mb-2 inline-block border border-[#0E7490] px-2 py-1">
                      {relatedPost.category}
                    </div>
                    <h3 className="font-syne font-bold text-lg text-[#111] group-hover:text-[#FF3366] transition mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#666] line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="text-xs text-[#999]">
                      {new Date(relatedPost.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })} • {relatedPost.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
