# DALL·E 3 Image Generator Kit

A modern Next.js application for generating AI-powered images using OpenAI's DALL·E 3, with secure user authentication and cloud storage.

Inspired by the previous DALLE 2 website design and **Claude Code**.
## Features

- 🎨 **AI Image Generation**: Create stunning images using DALL·E 3
- 🎭 **Advanced Options**: Quality settings (Standard/HD) and Style controls (Vivid/Natural)
- 📐 **Multiple Formats**: Square (1024×1024), Portrait (1024×1792), and Landscape (1792×1024)
- 🔐 **Secure Authentication**: Powered by Clerk
- 💾 **Cloud Storage**: AWS S3 integration for image storage
- 🗄️ **Database**: Supabase PostgreSQL with Drizzle ORM
- 📱 **Responsive Design**: Mobile-first Tailwind CSS design
- 🎯 **User Gallery**: Save and manage your generated images
- ⚡ **Modern Stack**: Next.js 15, TypeScript, React 19

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **AI**: OpenAI DALL·E 3 API
- **Storage**: AWS S3
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- Supabase account and database
- AWS S3 bucket
- Clerk account
- OpenAI API key (with DALL·E 3 access)

## Setup Instructions

### Quick Setup (Recommended)

**Windows:**
```powershell
.\setup.ps1
# Edit .env.local with your API keys
.\dev.ps1
```

**Mac/Linux:**
```bash
./setup.sh
# Edit .env.local with your API keys
./dev.sh
```

### Manual Setup

#### 1. Clone and Install

```bash
cd next-dalle-image-generator-kit
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `OPENAI_API_KEY`: OpenAI API key
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_S3_REGION`: AWS region
- `AWS_S3_BUCKET_NAME`: S3 bucket name

### 3. Database Setup

Generate and push database schema to Supabase:

```bash
npm run db:generate
npm run db:push
```

### 4. AWS S3 Setup

1. Create an S3 bucket in AWS
2. Set up proper CORS configuration for your bucket
3. Create an IAM user with S3 read/write permissions
4. Add the credentials to your environment variables

### 5. Clerk Setup

1. Create a new application in Clerk
2. Configure your sign-in/sign-up pages
3. Set up webhooks if needed
4. Add the keys to your environment variables

### 6. OpenAI Setup

1. Get an API key from OpenAI
2. Add it to your environment variables
3. Ensure you have sufficient credits for image generation

### 7. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── about/             # Public pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── db/               # Database schema and connection
│   ├── aws.ts            # AWS S3 integration
│   └── openai.ts         # OpenAI integration
└── middleware.ts         # Clerk middleware for route protection
```

## API Routes

- `POST /api/generate` - Generate images with DALL·E
- `GET /api/pictures` - Fetch user's saved pictures
- `POST /api/pictures/save` - Save generated image to gallery
- `DELETE /api/pictures/delete` - Delete image from gallery

## Key Components

- **Navbar**: Responsive navigation with authentication state
- **Generate Page**: AI image generation interface
- **My Pictures**: Personal image gallery management
- **Authentication Pages**: Sign-in/sign-up with Clerk

## Database Schema

The application uses a simplified schema with Clerk handling user management:
- `user_pictures`: Saved generated images with Clerk user ID reference

## Security Features

- Route protection with Clerk middleware
- Secure file uploads to S3
- User-specific image access
- API rate limiting (recommended to add)
- Environment variable validation

## Deployment

1. **Vercel** (recommended):
   ```bash
   npm run build
   ```
   Deploy through Vercel dashboard or CLI

2. **Other platforms**:
   - Ensure all environment variables are set
   - Database migrations are run
   - S3 bucket is properly configured

## License

This project is licensed under the MIT License.