
# MongoDB Setup & Usage Guide

We have successfully integrated MongoDB into your Next.js application. All dynamic content (Blogs, About Page, Admin Credentials) is now stored in the database.

## 1. Prerequisites
- Ensure MongoDB is running locally at `mongodb://localhost:27017/adaptive-sports`.
- The credentials and connection string are configured in `src/lib/mongoose.js`.

## 2. Initial Setup (Create Admin User)
Since the database is initially empty, you need to create the first admin user.

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and visit the setup API route to create the default admin:
   `http://localhost:3000/api/setup`

   You should see a message: `"Setup Complete: Created user "admin" with password "password123""`

   *Note: This route will only work if no admin exists. Once created, you should delete `src/app/api/setup/route.js` or secure it.*

## 3. How to Use

### Admin Login
- URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `password123`

### Manage Content
Once logged in, you can:
- **Manage Blogs**: Create, Edit, and Delete blog posts. The dashboard lists all posts.
- **Manage About Page**: Click "Edit About" on the dashboard to update the singleton About page content.

### Public Views
- **Home**: Latest blog posts are displayed in the "Latest Stories" section.
- **Blog Post**: Clicking a post opens the dynamic blog page (`/blog/[slug]` or `/blog/[id]`).
- **About Us**: The `/about` page fetches content directly from MongoDB.

## 4. Troubleshooting
- If images don't load, ensure the URLs provided are accessible.
- If you see "Loading..." indefinitely, check your console for MongoDB connection errors.
