# Empire Hybrid Lounge - Web Application

A production-grade hybrid daytime restaurant and night club web application for Empire Hybrid Lounge, located in Limbe, Cameroon.

## 🎯 Overview

This is a full-stack SaaS application built with:

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Payments**: CamPay/Monetbil integration with webhook support
- **PWA**: Progressive web app with offline support
- **i18n**: English and French localization

## ✨ Features

### Restaurant Module
- [x] Menu browsing with category filters
- [x] Item availability indicators
- [x] Server-synchronized ordering hours (08:00-17:30 Africa/Douala)
- [x] Dine-in and takeaway support
- [x] Kitchen dashboard with order status tracking
- [x] Late-night item support

### Night Club Module
- [x] Event listings with bilingual support
- [x] Ticket purchasing with inventory management
- [x] Guest list registration
- [x] VIP table reservations with 15-minute lock
- [x] Interactive floor map
- [x] Real-time availability updates

### Payment System
- [x] CamPay integration (primary)
- [x] Monetbil integration (placeholder)
- [x] Sandbox mode for development
- [x] Webhook verification
- [x] Idempotent payment processing
- [x] Reconciliation cron jobs

### Digital Passes & Check-in
- [x] QR code generation with secure token hashing
- [x] Customer pass dashboard
- [x] Mobile-optimized bouncer scanner
- [x] Atomic check-in operations
- [x] Duplicate scan detection

### PWA & Notifications
- [x] Offline fallback page
- [x] Service worker with caching strategies
- [x] Web Push notification support
- [x] Install prompt

### Admin Dashboard
- [x] Restaurant analytics
- [x] Club analytics
- [x] Financial overview
- [x] Quick actions
- [x] Role-based access control

## 🏗️ Architecture

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS with CSS custom properties |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (SSR) |
| Storage | Supabase Storage |
| Realtime | Supabase Realtime |
| Payments | CamPay, Monetbil |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| UI Primitives | Radix UI |

### Design System: Obsidian Core

Brand tokens defined as CSS custom properties:

```css
--color-primary: #ff0055;      /* Neon rose - CTAs */
--color-secondary: #00f0ff;     /* Coastal teal - accents */
--color-dark: #0b0c10;         /* Obsidian - base */
--color-surface: #1f2833;      /* Charcoal - surfaces */
--color-vip-gold: #c5a059;     /* VIP highlights */
--font-sans: "Inter", system-ui, sans-serif;
```

## 📁 Project Structure

```
/workspace/project/Empire-Web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [locale]/           # Localized routes
│   │   │   ├── (auth)/         # Auth pages (sign-in, sign-up)
│   │   │   ├── (public)/       # Public pages
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── dashboard/      # Customer dashboard
│   │   │   └── verify-pass/    # QR verification
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # UI primitives (Button, Card, etc.)
│   │   ├── layout/             # Layout components
│   │   └── features/           # Feature components
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   ├── payments/           # Payment providers
│   │   ├── i18n/               # Internationalization
│   │   ├── timezone/           # Time utilities
│   │   ├── qr/                 # QR code utilities
│   │   └── validation/         # Zod schemas
│   └── types/                  # TypeScript types
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seed.sql                # Sample data
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   └── offline.html            # Offline fallback
└── tailwind.config.ts          # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- CamPay/Monetbil merchant account (for production)

### Installation

```bash
# Clone the repository
cd Empire-Web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key

# Business
BUSINESS_TIMEZONE=Africa/Douala

# Payment Provider
PAYMENT_PROVIDER=sandbox  # or 'campay' for production
PAYMENT_API_BASE_URL=https://api.campay.net/api
PAYMENT_API_USERNAME=your-username
PAYMENT_API_PASSWORD=your-password
PAYMENT_WEBHOOK_SECRET=your-webhook-secret

# QR Security
QR_TOKEN_PEPPER=your-random-pepper
QR_SIGNING_SECRET=your-signing-secret

# Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-key
VAPID_PRIVATE_KEY=your-vapid-private
VAPID_SUBJECT=mailto:admin@example.com
```

### Database Setup

```bash
# Apply migrations
npx supabase db push

# Or apply manually
psql your-database-url < supabase/migrations/001_initial_schema.sql
psql your-database-url < supabase/migrations/002_rls_policies.sql
psql your-database-url < supabase/seed.sql
```

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📱 Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/[locale]` | Home page (en/fr) |
| `/[locale]/restaurant/menu` | Restaurant menu |
| `/[locale]/events` | Event listings |
| `/[locale]/sign-in` | Sign in |
| `/[locale]/sign-up` | Sign up |
| `/[locale]/verify-pass/[token]` | Pass verification |

### Protected Routes

| Route | Access |
|-------|--------|
| `/[locale]/admin/*` | Staff (admin, manager) |
| `/[locale]/dashboard/*` | Authenticated users |
| `/[locale]/verify-pass/[token]` | Bouncer check-in |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/webhooks/payments/[provider]` | POST | Payment webhooks |
| `/api/orders` | POST | Create order |
| `/api/reservations/lock` | POST | Lock table |
| `/api/passes/check-in` | POST | Verify and check-in |

## 🔐 Security

- **Row Level Security (RLS)** on all tables
- **Server-side authorization** on all protected routes
- **PKCE authentication** flows
- **Secure HTTP-only cookies** for sessions
- **Rate limiting** on sensitive endpoints
- **Webhook signature verification**
- **No secrets in client-side code**
- **SQL injection prevention** via parameterized queries

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📊 Database Schema

### Core Tables

- `profiles` - User profiles with roles
- `business_settings` - Business configuration
- `restaurant_categories` - Menu categories
- `menu_items` - Menu items with pricing
- `physical_tables` - Restaurant and club tables
- `orders` - Restaurant orders
- `order_items` - Order line items
- `events` - Club events
- `ticket_types` - Event ticket types
- `event_tables` - Event-specific table reservations
- `reservations` - Table reservations
- `payments` - Payment records
- `payment_events` - Webhook events
- `passes` - Digital passes with QR tokens
- `push_subscriptions` - Web Push subscriptions
- `notifications` - Notification records
- `audit_logs` - Security audit trail

## 🎨 UI Components

Built with Tailwind CSS and Radix UI primitives:

- `Button` - Multiple variants (primary, secondary, outline, ghost, vip)
- `Card` - Content containers
- `Input` - Form inputs
- `Select` - Dropdown selects
- `Dialog` - Modal dialogs
- `Badge` - Status badges
- `Alert` - Alert messages
- `Tabs` - Tab navigation
- `Skeleton` - Loading states
- `Tooltip` - Hover tooltips
- `DropdownMenu` - Dropdown menus

## 📄 License

Proprietary - Empire Hybrid Lounge

## 📞 Support

For technical support, contact the development team.
