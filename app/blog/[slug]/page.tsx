import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import '@/styles/article.css';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | NetCloud Academy`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(true);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-syne font-bold text-4xl mb-4">Post Not Found</h1>
          <p style={{ color: 'var(--text-light)' }} className="mb-8">
            The post you're looking for doesn't exist.
          </p>
          <Link href="/blog" className="btn btn-primary">
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
    <div>
      {/* Hero */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(180deg, #071426 0%, #020B18 100%)',
          borderBottom: '1px solid rgba(0,229,195,0.1)'
        }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="tag">{post.category}</span>
              <span className="font-space-mono text-xs ml-4" style={{ color: 'var(--text-light)' }}>
                {post.readTime}
              </span>
            </div>
            <h1 className="font-syne font-bold text-5xl mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 font-space-mono text-sm" style={{ color: 'var(--text-light)' }}>
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Article HTML */}
            <div 
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />

            {/* Author Info */}
            <div 
              className="mt-16 pt-8 border-t"
              style={{ borderColor: 'rgba(0,229,195,0.1)' }}>
              <div className="flex items-start gap-4">
                <div>
                  <h4 className="font-syne font-bold mb-2">About the Author</h4>
                  <p style={{ color: 'var(--text-light)' }} className="text-sm">
                    {post.author} is an expert in networking and cloud computing with years of industry experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-teal-500/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <div className="card p-6 h-full">
                  <div className="font-space-mono text-xs uppercase mb-2" style={{ color: 'var(--teal)' }}>
                    ← Previous
                  </div>
                  <h4 className="font-syne font-bold group-hover:text-teal transition">
                    {prevPost.title}
                  </h4>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <div className="card p-6 h-full">
                  <div className="font-space-mono text-xs uppercase mb-2 text-right" style={{ color: 'var(--teal)' }}>
                    Next →
                  </div>
                  <h4 className="font-syne font-bold group-hover:text-teal transition text-right">
                    {nextPost.title}
                  </h4>
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  );
}
