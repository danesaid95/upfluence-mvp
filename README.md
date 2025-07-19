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

### 🏗️ **Technical Stack**
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL (NeonDB), Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Payments**: Stripe (configured)
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
├── .env.example            # Environment variables template
└── README.md              # This file
```

## 🚀 Quick Start

### 1. **Clone & Install**
```bash
cd upfluence-mvp
npm install
```

### 2. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Add your database URL and secrets
# DATABASE_URL="your-neondb-connection-string"
# NEXTAUTH_SECRET="your-secret-key"
```

### 3. **Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with dummy data
npm run db:seed
```

### 4. **Start Development**
```bash
npm run dev
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

## 📊 **Database Schema Overview**

### Core Models
- **Users** - Brands, Influencers, Admins with role-based access
- **Subscriptions** - Free, Pro, Agency plans with Stripe integration
- **Influencer Profiles** - Detailed creator information and metrics
- **Social Profiles** - Instagram, YouTube, TikTok accounts and stats
- **Campaigns** - Brand marketing campaigns with targeting
- **Messages** - Direct communication system
- **Bookings** - Project management and payments

### Key Features
- **Role-based permissions** - Different access levels for each user type
- **Comprehensive metrics** - Follower counts, engagement rates, analytics
- **Campaign matching** - Advanced filtering and search capabilities
- **Secure messaging** - Built-in communication system
- **Payment processing** - Ready for Stripe integration

## 🎯 **User Journeys**

### Brand Journey
1. **Sign up** → Choose "Brand" account type
2. **Dashboard** → View campaign performance and metrics  
3. **Find Influencers** → Search and filter by criteria
4. **Create Campaigns** → Set budget, requirements, targeting
5. **Messaging** → Communicate directly with creators
6. **Analytics** → Track campaign performance

### Influencer Journey  
1. **Sign up** → Choose "Influencer" account type
2. **Profile Setup** → Connect social accounts, set rates
3. **Dashboard** → View earnings, active campaigns
4. **Opportunities** → Browse and apply to campaigns
5. **Messaging** → Communicate with brands
6. **Analytics** → Track profile performance

## 🔧 **Development Commands**

```bash
# Development
npm run dev                 # Start development server

# Database
npm run db:generate        # Generate Prisma client
npm run db:migrate         # Run database migrations  
npm run db:push           # Push schema changes
npm run db:seed           # Seed with dummy data

# Production
npm run build             # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

## 🌐 **Deployment Ready**

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway/Render (Database)
- Set `DATABASE_URL` environment variable
- Run migrations: `npm run db:migrate`
- Seed data: `npm run db:seed`

### Environment Variables Required
```bash
DATABASE_URL=              # PostgreSQL connection string
NEXTAUTH_URL=             # Your app URL  
NEXTAUTH_SECRET=          # Random secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe public key
STRIPE_SECRET_KEY=        # Stripe secret key
STRIPE_WEBHOOK_SECRET=    # Stripe webhook secret
```

## 🎨 **Customization**

### Branding
- Update colors in `tailwind.config.js`
- Replace logo in components and landing page
- Modify brand name throughout the application

### Features
- Add new social platforms in `prisma/schema.prisma`
- Extend user roles and permissions
- Implement additional payment methods
- Add more analytics and reporting features

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`  
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🛟 **Support**

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using modern web technologies**

*Ready to deploy and scale for production use!*