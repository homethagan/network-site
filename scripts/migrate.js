#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && key.trim()) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migratePostsToDatabase() {
  try {
    console.log('🚀 Starting migration of posts to database...\n');

    const postsDir = path.join(process.cwd(), 'content', 'posts');
    
    if (!fs.existsSync(postsDir)) {
      console.error('❌ Error: content/posts directory not found');
      process.exit(1);
    }

    const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
      console.error('❌ Error: No markdown files found in content/posts');
      process.exit(1);
    }

    console.log(`📝 Found ${files.length} post(s) to migrate\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      try {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Generate slug from filename if not in frontmatter
        const slug = data.slug || file.replace(/\.md$/, '').toLowerCase().trim();

        // Validate required fields
        if (!slug || !data.title) {
          console.warn(`⚠️  Skipping ${file}: Missing title (slug: ${slug})`);
          errorCount++;
          continue;
        }

        // Check if post already exists
        const existing = await prisma.post.findUnique({
          where: { slug: slug },
        });

        if (existing) {
          console.log(`⏭️  Skipping "${data.title}" - Already exists in database`);
          continue;
        }

        // Create post in database
        const post = await prisma.post.create({
          data: {
            slug: slug,
            title: data.title,
            excerpt: data.excerpt || 'No excerpt provided',
            content: content,
            category: data.category || 'General',
            author: data.author || 'Admin',
            date: data.date ? new Date(data.date) : new Date(),
            readTime: data.readTime || '5 min read',
            published: data.published !== false,
            tags: JSON.stringify(data.tags || []),
          },
        });

        console.log(`✅ Migrated: "${post.title}"`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error migrating ${file}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Successfully migrated: ${successCount} post(s)`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📦 Total processed: ${files.length} file(s)\n`);

    if (successCount > 0) {
      console.log('🎉 Migration completed successfully!');
      console.log('📌 Note: Markdown files are still in content/posts (not deleted)');
      console.log('💡 You can now delete markdown files if you prefer database-only storage\n');
    } else {
      console.log('⚠️  No posts were migrated. Check errors above.\n');
    }

    // Verify data in database
    const totalPosts = await prisma.post.count();
    console.log(`📚 Total posts now in database: ${totalPosts}`);

  } catch (error) {
    console.error('❌ Fatal error during migration:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Ensure DATABASE_URL is correctly set in .env.local');
    console.error('2. Verify Hostinger MySQL database is accessible');
    console.error('3. Run: npx prisma migrate dev --name init (to create tables)');
    console.error('4. Run: npm install gray-matter (if not installed)');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migratePostsToDatabase();
