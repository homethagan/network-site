import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  published: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export function getAllPosts(publishedOnly = true): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null);

  // Sort by date descending
  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (publishedOnly) {
    return posts.filter((post) => post.published);
  }

  return posts;
}

export function getPostBySlug(slugParam?: string | string[]): Post | null {
  if (!slugParam) return null;

  // Normalize slug when it's an array or encoded
  let slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  try {
    slug = decodeURIComponent(String(slug));
  } catch {
    slug = String(slug);
  }

  // Remove any leading slashes
  if (slug.startsWith('/')) slug = slug.replace(/^\/+/, '');

  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      content,
      ...(data as PostFrontmatter),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function savePost(post: Post): void {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const { slug, content, ...frontmatter } = post;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = matter.stringify(content, frontmatter);

  fs.writeFileSync(fullPath, fileContent);
}

export function deletePost(slug: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

export function getCategories(): string[] {
  const posts = getAllPosts(true);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts(true).filter((post) => post.category === category);
}
