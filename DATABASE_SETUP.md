# Database Setup Guide - Hostinger MySQL

Your site is now configured to use your Hostinger MySQL database.

## 📋 Database Details
- **Database**: u716020575_homethagancom
- **User**: u716020575_homethagancom
- **Password**: Homi@200213903997
- **Host**: Check below for correct host

## 🔧 Setup Steps

### Step 1: Find Your Hostinger MySQL Host

1. Log in to your Hostinger cPanel
2. Go to **Databases** → **MySQL Databases**
3. Find your database `u716020575_homethagancom`
4. Look for the **Host** address - it's typically one of:
   - `localhost` (if connecting from same server)
   - `127.0.0.1`
   - `mysql.hostinger.com`
   - Or a specific IP provided by Hostinger

### Step 2: Update DATABASE_URL

Edit `.env.local` and update the host:

```
DATABASE_URL="mysql://u716020575_homethagancom:Homi@200213903997@[YOUR_HOST]:3306/u716020575_homethagancom"
```

Replace `[YOUR_HOST]` with the actual host from Step 1.

### Step 3: Install Dependencies

Run this command to install Prisma and MySQL client:

```bash
npm install @prisma/client
npm install -D prisma
```

### Step 4: Initialize Prisma

Run migrations to create tables:

```bash
npx prisma migrate dev --name init
```

If you get an error about credentials, check:
1. Host name is correct
2. Username and password are correct
3. Database exists in cPanel
4. MySQL user has permissions to that database

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

### Step 6: Seed Initial Data (Optional)

Create a `prisma/seed.ts` file to add default admin user:

```typescript
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  // Create default admin user
  const admin = await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'admin@homethagan.com',
      password: await bcrypt.hash('ChangeMe123!', 10),
    },
  });
  
  console.log('Admin user created:', admin);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
```

Then run:
```bash
npx prisma db seed
```

## 🔄 Migrating from Markdown Files to Database

### Option 1: Manual Migration
1. In admin portal, re-create each post through the UI
2. Posts will be saved to database
3. Optionally delete markdown files afterward

### Option 2: Bulk Import Script
Create `scripts/migrateToDb.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { prisma } from '@/lib/prisma';

async function migratePostsToDb() {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const files = fs.readdirSync(postsDir);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    await prisma.post.create({
      data: {
        slug: data.slug || file.replace('.md', ''),
        title: data.title,
        excerpt: data.excerpt,
        content: content,
        category: data.category,
        author: data.author,
        date: new Date(data.date),
        readTime: data.readTime,
        published: data.published !== false,
        tags: JSON.stringify(data.tags || []),
      },
    });

    console.log(`✅ Migrated: ${data.title}`);
  }

  console.log('Migration complete!');
}

migratePostsToDb().catch(console.error);
```

Run with:
```bash
npx ts-node scripts/migrateToDb.ts
```

## 📊 Database Tables

### posts
- `id` - Unique identifier (UUID)
- `slug` - URL-friendly identifier (unique)
- `title` - Post title
- `excerpt` - Short description
- `content` - Full markdown content
- `category` - Post category
- `author` - Author name
- `date` - Publication date
- `readTime` - Reading time estimate
- `published` - Boolean for visibility
- `tags` - JSON array of tags

### admin_users
- `id` - User ID
- `username` - Login username
- `password` - Hashed password
- `email` - Email address

### admin_sessions
- `id` - Session ID
- `userId` - Reference to admin user
- `token` - Session token
- `expiresAt` - Session expiration time

## ⚠️ Important Notes

1. **Keep credentials secure** - Never commit `.env.local` to git
2. **Backup database** - Use Hostinger's backup tools regularly
3. **Update API routes** - Posts API will need to be updated to use Prisma
4. **Keep markdown files** - Optional backup of content as markdown
5. **Test thoroughly** - Test all CRUD operations before going live

## 🔗 Useful Commands

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check database schema
npx prisma db pull

# Generate Prisma client
npx prisma generate
```

## 🆘 Troubleshooting

### Connection Refused
- Check host name is correct
- Verify MySQL service is running on Hostinger
- Check firewall rules allow MySQL connections

### Authentication Failed
- Verify username and password are correct
- Ensure special characters are properly escaped
- Check database user exists in cPanel

### Database Not Found
- Verify database name matches exactly (case-sensitive)
- Ensure database was created in cPanel

## 📞 Support

For Hostinger-specific issues:
- Check Hostinger docs: https://support.hostinger.com/en/articles/4291622-how-to-connect-to-mysql-remotely
- Contact Hostinger support for host details

For Prisma issues:
- Prisma docs: https://www.prisma.io/docs/
- Prisma community: https://www.prisma.io/community

---

Your database is now set up and ready to use! 🚀
