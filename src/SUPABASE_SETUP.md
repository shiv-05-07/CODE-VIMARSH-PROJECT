# Supabase Integration Setup Guide

## Overview
This application has been updated to use **Supabase** as the primary database for member data (Join page and Members Directory). The Wix CMS continues to manage Events, Projects, and Roadmap Milestones.

## Architecture
- **Supabase**: Handles member data (name, email, tech_stack, github_handle)
- **Wix CMS**: Continues to manage Events, Projects, and Roadmap Milestones
- **No Velo Backend**: Direct Supabase client integration in React frontend

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Choose a region and set a strong database password
5. Wait for the project to be provisioned

### 2. Create the Members Table
Once your Supabase project is ready:

1. Go to the **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the following SQL:

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  tech_stack TEXT,
  github_handle TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON members
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON members
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON members
  FOR DELETE USING (true);
```

4. Click **Run** to execute the SQL

### 3. Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **Anon Key** (this is your `VITE_SUPABASE_ANON_KEY`)

### 4. Configure Environment Variables
1. In the root of your project, create a `.env.local` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

### 5. Install Supabase Client (if not already installed)
The Supabase client should already be installed, but if you need to reinstall:

```bash
npm install @supabase/supabase-js
```

## Updated Components

### JoinPage.tsx
- Form now submits data to Supabase `members` table
- Fields: `name`, `email`, `tech_stack`, `github_handle`
- Includes error handling and success feedback

### MembersDirectoryPage.tsx
- Fetches all members from Supabase
- Displays members in a grid layout
- Search functionality filters by name and tech_stack
- GitHub links are generated from `github_handle`

### MemberDetailPage.tsx
- Fetches individual member details from Supabase
- Displays member information and GitHub profile link

## File Structure
```
src/
├── lib/
│   └── supabaseClient.ts    # Supabase client initialization
├── components/pages/
│   ├── JoinPage.tsx         # Updated to use Supabase
│   ├── MembersDirectoryPage.tsx  # Updated to use Supabase
│   └── MemberDetailPage.tsx      # Updated to use Supabase
```

## Testing the Integration

### 1. Test the Join Form
1. Navigate to `/join`
2. Fill out the form with test data
3. Submit the form
4. Check your Supabase dashboard → **Table Editor** → **members** to verify the data was inserted

### 2. Test the Members Directory
1. Navigate to `/members`
2. You should see the members you added through the join form
3. Test the search functionality
4. Click on a member to view their detail page

### 3. Test Member Detail Page
1. From the members directory, click "View Profile" on any member
2. Verify the member information displays correctly
3. Test the GitHub link (if available)

## Troubleshooting

### "Missing Supabase environment variables" Error
- Make sure `.env.local` file exists in the root directory
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correctly set
- Restart your development server after adding environment variables

### Members Not Appearing
- Check that the `members` table exists in your Supabase database
- Verify Row Level Security (RLS) policies are enabled and allow public access
- Check browser console for any error messages

### Form Submission Fails
- Verify your Supabase credentials are correct
- Check that the `members` table has the correct columns
- Ensure RLS policies allow INSERT operations

## Security Notes
- The Anon Key is safe to expose in the frontend (it's designed for public access)
- RLS policies control what data can be accessed and modified
- For production, consider implementing more restrictive RLS policies

## Next Steps
- Customize the RLS policies based on your security requirements
- Add additional fields to the `members` table if needed
- Implement authentication if you want to restrict member management

## Support
For issues with Supabase, visit: https://supabase.com/docs
