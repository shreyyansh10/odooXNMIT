# Database Setup Guide for Hackathon

## Quick Database Options

### Option 1: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create a cluster (free tier available)
4. Get connection string
5. Install MongoDB driver: `npm install mongodb`

### Option 2: Supabase (PostgreSQL)
1. Go to [Supabase](https://supabase.com)
2. Create free project
3. Get connection string from Settings > Database
4. Install PostgreSQL driver: `npm install pg`

### Option 3: SQLite (Simplest)
1. Install SQLite: `npm install sqlite3`
2. No external setup needed!

## Environment Variables
Add to your `.env` file:

```env
# For MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackathon-auth

# For PostgreSQL
DATABASE_URL=postgresql://username:password@host:port/database

# For SQLite
DATABASE_PATH=./database.sqlite
```

## Quick Implementation
The current system works without a database, but you can easily add one by:

1. Installing the database driver
2. Replacing the in-memory `users` array with database calls
3. Adding connection logic to `server.js`

## For Hackathon Demo
**Recommendation**: Use the current in-memory system for your demo. It's:
- ✅ Fast to set up
- ✅ No external dependencies
- ✅ Perfect for demos
- ✅ Easy to present

You can always add a database later if needed!
