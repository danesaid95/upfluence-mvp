# Upfluence MVP - Influencer Marketing Platform

A modern, full-stack influencer marketing platform built with Next.js, TypeScript, Prisma, and PostgreSQL. Connect brands with authentic influencers for successful marketing campaigns.

## 🚀 Features

### ✅ **Core Features Implemented**
- **🔐 Authentication System** - Role-based auth for Brands, Influencers, and Admins
- **📊 Comprehensive Dashboards** - Tailored experiences for each user type
- **🔍 Advanced Search** - Find influencers by category, location, followers, etc.
- **💬 Messaging System** - Direct communication between brands and creators
- **📱 Social Media Integration** - Track Instagram, YouTube, TikTok metrics
- **💳 Subscription Billing** - Ready for Stripe integration (Free, Pro, Agency)
- **📈 Analytics & Reporting** - Performance tracking and insights
- **🎯 Campaign Management** - Create and manage influencer campaigns
- **📋 Profile Management** - Complete influencer profiles with verification
- **🧪 Automated Testing** - Comprehensive Playwright test suite
- **🐳 Docker Support** - Containerized deployment ready

### 🏗️ **Technical Stack**
- **Frontend**: Next.js 15.4.1, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js v5
- **Database**: PostgreSQL (NeonDB), Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Testing**: Playwright for E2E testing
- **Containerization**: Docker with multi-stage builds
- **UI Components**: Lucide React, Headless UI
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure

```
upfluence-mvp/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Realistic dummy data
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── auth/             # Authentication pages
│   │   ├── dashboard/        # Brand dashboard
│   │   ├── influencer/       # Influencer dashboard
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable components
│   ├── lib/                # Utilities and configurations
│   └── types/              # TypeScript definitions
├── tests/                  # Playwright test suites
├── Dockerfile             # Container configuration
├── playwright.config.ts   # Test configuration
└── README.md              # This file
```

## 🚀 Quick Start

### 1. **Clone & Install**
```bash
git clone https://github.com/danesaid95/upfluence-mvp.git
cd upfluence-mvp
npm install
```

### 2. **Environment Setup**
```bash
# Add your database URL and secrets to .env.local
DATABASE_URL="your-neondb-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. **Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Seed with dummy data
npm run db:seed
```

### 4. **Start Development**
```bash
# Option 1: Local development
npm run dev

# Option 2: Docker (recommended)
docker build -t upfluence-mvp .
docker run -d -p 3000:3000 --name upfluence-container upfluence-mvp
```

Visit `http://localhost:3000` to see the application.

## 🔑 **Test Credentials**

After seeding, use these credentials to explore the platform:

### Brand Account
- **Email**: `sarah@fashionnova.com`
- **Password**: `password123`
- **Features**: Campaign creation, influencer search, messaging

### Influencer Account  
- **Email**: `sarah@lifestyle.com`
- **Password**: `password123`
- **Features**: Profile management, campaign opportunities, analytics

### Admin Account
- **Email**: `admin@upfluence.com` 
- **Password**: `admin123`
- **Features**: Platform administration, user management

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# View test reports
npm run test:report
```

## 🔧 **Development Commands**

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Database
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema changes
npm run db:seed           # Seed with dummy data

# Testing
npm test                  # Run Playwright tests
npm run test:ui           # Run tests with UI
npm run test:report       # View test reports
```

## 🌐 **Deployment Ready**

### Docker Deployment
```bash
# Build image
docker build -t upfluence-mvp .

# Run container
docker run -d -p 3000:3000 --name upfluence-mvp upfluence-mvp
```

### Cloud Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Railway**: Deploy with PostgreSQL database
- **AWS/DigitalOcean**: Use Docker container

### Environment Variables Required
```bash
DATABASE_URL=              # PostgreSQL connection string
NEXTAUTH_URL=             # Your app URL  
NEXTAUTH_SECRET=          # Random secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe public key (optional)
STRIPE_SECRET_KEY=        # Stripe secret key (optional)
```

## 📊 **Database Schema Overview**

### Core Models
- **Users** - Brands, Influencers, Admins with role-based access
- **Subscriptions** - Free, Pro, Agency plans with Stripe integration
- **Influencer Profiles** - Detailed creator information and metrics
- **Social Profiles** - Instagram, YouTube, TikTok accounts and stats
- **Campaigns** - Brand marketing campaigns with targeting
- **Messages** - Direct communication system
- **Bookings** - Project management and payments

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`  
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**

*Ready to deploy and scale for production use!*
