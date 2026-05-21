# Migration Guide - Markdown to MySQL Database

Follow these steps to migrate all your blog posts from markdown files to your Hostinger MySQL database.

---

## ✅ Pre-Migration Checklist

Before starting, ensure you have:

- [ ] `.env.local` file with correct `DATABASE_URL`
- [ ] Hostinger MySQL database credentials verified
- [ ] All dependencies installed
- [ ] Database tables created (via Prisma migrate)

---

## 📋 Step 1: Verify Database Setup

### Check your `.env.local` contains:
```
DATABASE_URL="mysql://u716020575_homethagancom:Homi@200213903997@[YOUR_HOST]:3306/u716020575_homethagancom"
```

Replace `[YOUR_HOST]` with your Hostinger MySQL host (check cPanel).

### Test connection:
```bash
npx prisma studio
```

If Prisma Studio opens, your connection is working! ✅

---

## 🔧 Step 2: Install Required Packages

```bash
npm install @prisma/client
npm install -D prisma
npm install gray-matter ts-node
```

---

## 🗃️ Step 3: Create Database Tables

Run Prisma migration to create the required tables:

```bash
npx prisma migrate dev --name init
```

You'll see:
- ✅ Database tables created
- ✅ Prisma Client generated

---

## 🚀 Step 4: Run Migration Script

Execute the migration script to import all markdown posts:

```bash
npx ts-node scripts/migrateToDb.ts
```

### Expected Output:
```
🚀 Starting migration of posts to database...

📝 Found 4 post(s) to migrate

✅ Migrated: "Understanding DNS and Domain Names"
✅ Migrated: "Getting Started with Cloud Computing"
✅ Migrated: "Introduction to Networking Fundamentals"
✅ Migrated: "Hi Test Post"

📊 Migration Summary:
   ✅ Successfully migrated: 4 post(s)
   ❌ Errors: 0
   📦 Total processed: 4 file(s)

🎉 Migration completed successfully!
📌 Note: Markdown files are still in content/posts (not deleted)

📚 Total posts now in database: 4
```

---

## ✅ Step 5: Verify Migration in phpMyAdmin

1. **Open phpMyAdmin** in Hostinger cPanel
2. **Select database**: `u716020575_homethagancom`
3. **Check tables**:
   - Click `Post` table
   - You should see 4 rows (your posts)
   - Verify all columns are populated

### Columns to check:
- `slug` - URL-friendly name
- `title` - Post title
- `content` - Full markdown content
- `excerpt` - Short description
- `category` - Post category
- `author` - Author name
- `date` - Publication date
- `tags` - Tag array (JSON)

---

## 🔍 Step 6: Verify in Prisma Studio

View data in a graphical interface:

```bash
npx prisma studio
```

- Opens at `http://localhost:5555`
- Click `Post` to see all migrated posts
- Edit or delete posts directly

---

## 🌐 Step 7: Update Your App to Use Database

Your API routes need to be updated to read from database instead of markdown files.

### Option A: Keep Both (Recommended for safety)
- Markdown files stay as backup
- App reads from database first
- Falls back to markdown if not found

### Option B: Database Only
- Delete markdown files
- Faster, cleaner setup
- Make sure backup is safe first

---

## ⚠️ Troubleshooting

### Error: "Connection refused"
```
❌ Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
- Check host in DATABASE_URL (not localhost if remote server)
- Verify Hostinger MySQL is accessible
- Contact Hostinger support for host details

### Error: "Unknown database"
```
❌ Error: Unknown database 'u716020575_homethagancom'
```
**Solution:**
- Verify database name in cPanel
- Check database was created successfully
- Compare with DATABASE_URL

### Error: "Access denied for user"
```
❌ Error: Access denied for user 'u716020575_homethagancom'
```
**Solution:**
- Verify username in cPanel
- Check password is correct (special characters!)
- Ensure user has permissions for database

### Script won't run
```
❌ error TS2307: Cannot find module 'gray-matter'
```
**Solution:**
```bash
npm install gray-matter
npm install -D ts-node
```

---

## 📊 What Gets Migrated

### From Markdown Frontmatter:
```yaml
---
title: "Post Title"
slug: "post-slug"
excerpt: "Short description"
category: "Cloud Computing"
author: "Your Name"
date: "2024-01-15"
readTime: "5 min read"
tags:
  - cloud
  - aws
  - infrastructure
published: true
---
```

### To Database Post Table:
- ✅ `title` → Saved as-is
- ✅ `slug` → Unique identifier
- ✅ `excerpt` → Meta description
- ✅ `content` → Markdown body
- ✅ `category` → For filtering
- ✅ `author` → Attribution
- ✅ `date` → Publication date
- ✅ `readTime` → Display in UI
- ✅ `tags` → Stored as JSON array
- ✅ `published` → Visibility flag

---

## 🎯 After Migration

### Next Steps:
1. **Update blog page** to fetch from database
2. **Update admin routes** to use Prisma
3. **Test all features** work with database
4. **Keep markdown files** as backup for 7 days
5. **Deploy to production** with database

### Update `app/blog/[slug]/page.tsx`:
```typescript
// OLD - Read from markdown
const post = getPostBySlug(slug);

// NEW - Read from database
const post = await prisma.post.findUnique({
  where: { slug: slug },
});
```

### Update `app/blog/page.tsx`:
```typescript
// OLD - Get all from markdown
const posts = getAllPosts();

// NEW - Get all from database
const posts = await prisma.post.findMany({
  where: { published: true },
  orderBy: { date: 'desc' },
});
```

---

## 🔒 Backup & Safety

### Before Migration:
1. ✅ Backup markdown files locally
2. ✅ Backup Hostinger database (cPanel backup)
3. ✅ Keep database URL safe

### After Migration:
1. ✅ Keep markdown files for 7 days
2. ✅ Test thoroughly in development
3. ✅ Keep database backups current

---

## 📞 Getting Help

If migration fails:

1. **Check DATABASE_URL** format
2. **Verify Hostinger host** in cPanel
3. **Test connection** with Prisma Studio
4. **Check error messages** in console
5. **Review DATABASE_SETUP.md** for detailed guide

---

## 🎉 Success!

Once migration completes:
- ✅ All posts in MySQL database
- ✅ Posts visible in phpMyAdmin
- ✅ Posts visible in Prisma Studio
- ✅ Ready to update app code
- ✅ Ready to deploy!

---

**Migration Status**: Ready to start! 🚀

Run this command when ready:
```bash
npx ts-node scripts/migrateToDb.ts
```
