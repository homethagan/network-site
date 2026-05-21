# Install Database Dependencies

Run these commands to install required packages:

```bash
npm install @prisma/client
npm install -D prisma
npm install bcryptjs  # For password hashing in admin user
```

## What gets installed:

- **@prisma/client** - Prisma Client for database queries
- **prisma** - Prisma CLI for migrations and management
- **bcryptjs** - For secure password hashing

## After Installation

1. Verify `.env.local` has correct DATABASE_URL
2. Run: `npx prisma migrate dev --name init`
3. Check DATABASE_SETUP.md for next steps
