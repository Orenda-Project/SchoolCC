# Local Development Setup Guide

## Prerequisites
- Node.js installed
- PostgreSQL database running (local or remote)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required: PostgreSQL database connection string
DATABASE_URL=postgresql://user:password@localhost:5432/taleemhub

# Optional: Server port (defaults to 5000)
PORT=5000

# Optional: Anthropic API Key for AI features
ANTHROPIC_API_KEY=your_api_key_here
```

**Important:** Replace the `DATABASE_URL` with your actual PostgreSQL connection string.

#### For Replit Database Users:

To get your Replit database connection string:

1. **Option 1: From Replit Secrets**
   - In your Replit project, click the lock icon (Secrets) in the left sidebar
   - Look for `DATABASE_URL` and copy its value

2. **Option 2: From Database Panel**
   - In Replit, open the Database panel (database icon)
   - Click on "Connect" or "Connection String"
   - Copy the connection string (it should look like: `postgresql://user:password@host:port/dbname`)

3. **Option 3: Check Environment Variables**
   - In Replit's shell, run: `echo $DATABASE_URL`
   - Copy the output

Then paste it into your local `.env` file as `DATABASE_URL=your_connection_string_here`

### 3. Set Up Database

Make sure your PostgreSQL database is running and accessible. You may need to:
- Create the database if it doesn't exist
- Run migrations if needed: `npm run db:push`

### 4. Run the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## Troubleshooting

### "DATABASE_URL is not set" Error
- Make sure you've created a `.env` file in the root directory
- Verify the `DATABASE_URL` is correctly formatted

### Port Already in Use
- Change the `PORT` in your `.env` file to a different port
- Or stop the process using port 5000

### Database Connection Issues
- Verify PostgreSQL is running
- Check your database credentials
- Ensure the database exists


