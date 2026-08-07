# Empire Hybrid Lounge - Deployment Guide

## 🚀 Production Deployment

### 1. Vercel Deployment

#### Prerequisites
- Vercel account (or CLI access)
- GitHub/GitLab repository with the codebase

#### Steps

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Link project
   vercel link
   ```

2. **Configure Environment Variables**

   In Vercel Dashboard → Settings → Environment Variables:

   | Variable | Value | Environments |
   |----------|-------|--------------|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production |
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | All |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key | All |
   | `SUPABASE_SECRET_KEY` | Supabase service role key | Production |
   | `BUSINESS_TIMEZONE` | `Africa/Douala` | All |
   | `PAYMENT_PROVIDER` | `campay` | Production |
   | `PAYMENT_API_BASE_URL` | CamPay API URL | Production |
   | `PAYMENT_API_USERNAME` | CamPay username | Production |
   | `PAYMENT_API_PASSWORD` | CamPay password | Production |
   | `PAYMENT_WEBHOOK_SECRET` | CamPay webhook secret | Production |
   | `QR_TOKEN_PEPPER` | Random 32+ char string | All |
   | `QR_SIGNING_SECRET` | Random 32+ char string | All |
   | `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key | All |
   | `VAPID_PRIVATE_KEY` | VAPID private key | Production |
   | `VAPID_SUBJECT` | `mailto:admin@example.com` | All |
   | `CRON_SECRET` | Random secret | Production |

3. **Deploy**
   ```bash
   # Production deploy
   vercel --prod
   
   # Or push to main branch to auto-deploy
   git push origin main
   ```

### 2. Supabase Setup

#### Database Migrations

1. **Apply Migrations**
   ```bash
   # Using Supabase CLI
   supabase db push
   
   # Or manually via SQL Editor
   # Run files in order:
   # 1. supabase/migrations/001_initial_schema.sql
   # 2. supabase/migrations/002_rls_policies.sql
   ```

2. **Seed Data (Optional)**
   ```bash
   # Run seed data
   psql your-database-url < supabase/seed.sql
   ```

#### Storage Buckets

Create the following buckets in Supabase Storage:

| Bucket | Public | Purpose |
|--------|--------|---------|
| `menu-images` | Yes | Menu item images |
| `event-flyers` | Yes | Event promotional images |
| `public-brand-assets` | Yes | Logo, icons, etc. |
| `private-passes` | No | Customer pass PDFs |

#### Storage Policies

**Menu Images** (Public read, authenticated write):
```sql
CREATE POLICY "Public read menu images" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-images');

CREATE POLICY "Authenticated upload menu images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'menu-images' AND
    (auth.role() = 'authenticated' AND 
     EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'restaurant_manager')))
  );
```

**Event Flyers** (Public read, authenticated write):
```sql
CREATE POLICY "Public read event flyers" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-flyers');

CREATE POLICY "Authenticated upload event flyers" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'event-flyers' AND
    (auth.role() = 'authenticated' AND 
     EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'club_manager')))
  );
```

**Private Passes** (Owner-only access):
```sql
CREATE POLICY "Owner read passes" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'private-passes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

#### Authentication Configuration

1. **Email Templates**
   - Configure Supabase email templates for verification
   - Set redirect URLs for password reset

2. **Auth Redirect URLs**
   ```
   https://your-domain.com/*/auth/callback
   https://your-domain.com/auth/callback
   ```

3. **Site URL**
   ```
   https://your-domain.com
   ```

### 3. Payment Provider Setup

#### CamPay Configuration

1. **Create CamPay Account**
   - Sign up at https://campay.net/
   - Complete merchant verification
   - Get API credentials

2. **Configure Webhook**
   - Set webhook URL: `https://your-domain.com/api/webhooks/payments/campay`
   - Note the webhook secret

3. **Test Mode**
   - Use sandbox mode for testing
   - Switch to production when ready

#### Monetbil Configuration (Optional)

1. **Create Monetbil Account**
   - Sign up at https://www.monetbil.com/
   - Get API key

2. **Configure Webhook**
   - Set callback URL: `https://your-domain.com/api/webhooks/payments/monetbil`

### 4. Web Push Notification Setup

#### VAPID Keys

Generate keys:
```bash
npx web-push generate-vapid-keys
```

This will output:
- Public key → `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- Private key → `VAPID_PRIVATE_KEY`

#### Vercel Environment Variables

Add the generated keys to Vercel environment variables.

### 5. Domain Configuration

#### DNS Setup

Add the following DNS records:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |
| CNAME | api | cname.vercel-dns.com |

#### Custom Domain (Vercel)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Add DNS records as instructed
4. Wait for verification

### 6. Cron Job Setup

#### Vercel Cron (Optional)

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/reconcile-payments",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

#### Supabase pg_cron

```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule payment reconciliation every 15 minutes
SELECT cron.schedule(
  'reconcile-payments',
  '*/15 * * * *',
  $$SELECT reconcile_pending_payments()$$
);

-- Schedule expired lock cleanup every minute
SELECT cron.schedule(
  'cleanup-expired-locks',
  '* * * * *',
  $$SELECT release_expired_table_locks()$$
);
```

### 7. Security Checklist

- [ ] All secrets are in environment variables (not in code)
- [ ] `SUPABASE_SECRET_KEY` is production-only
- [ ] Payment provider credentials are production-only
- [ ] RLS policies are enabled on all tables
- [ ] Storage buckets have appropriate policies
- [ ] Auth redirect URLs are configured
- [ ] Webhook signature verification is active
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced
- [ ] Security headers are configured

### 8. Production Readiness Checklist

- [ ] All environment variables are set
- [ ] Database migrations are applied
- [ ] RLS policies are tested
- [ ] Seed data is loaded (if needed)
- [ ] Storage buckets are created with policies
- [ ] Payment provider webhooks are configured
- [ ] Custom domain is verified
- [ ] SSL certificate is active
- [ ] VAPID keys are generated
- [ ] Test payment flow completes successfully
- [ ] Error monitoring is configured (optional)
- [ ] Analytics tracking is configured (optional)

### 9. Post-Deployment Verification

1. **Test Authentication**
   ```bash
   curl -X POST https://your-domain.com/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","metadata":{"full_name":"Test User"}}'
   ```

2. **Test Health Endpoint**
   ```bash
   curl https://your-domain.com/api/health
   ```

3. **Test Public Pages**
   - [ ] Home page loads
   - [ ] Menu page displays
   - [ ] Events page displays

4. **Test Authenticated Flow**
   - [ ] Sign up works
   - [ ] Email verification works
   - [ ] Sign in works
   - [ ] Protected pages require auth

5. **Test Payment Flow (Sandbox)**
   - [ ] Order creation works
   - [ ] Payment initiation works
   - [ ] Webhook processing works
   - [ ] Pass generation works

### 10. Monitoring & Maintenance

#### Error Monitoring (Optional)

Set up Sentry:
```bash
npm install @sentry/nextjs
npx sentry-wizard init
```

#### Backup Schedule

Supabase provides automatic backups:
- Daily backups (free tier)
- Point-in-time recovery (Pro tier)

#### Log Retention

Configure log retention in Supabase dashboard based on compliance requirements.

### Troubleshooting

#### Common Issues

**Build Fails**
- Check environment variables are set in Vercel
- Run `npm run build` locally to reproduce

**Database Connection Errors**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check if IP is allowlisted (if applicable)

**Webhook Not Working**
- Verify webhook URL is accessible
- Check webhook secret is correct
- Review webhook logs in payment provider dashboard

**Auth Redirect Issues**
- Verify site URL in Supabase settings
- Add all redirect URLs including development URLs

#### Rollback Plan

1. **Vercel**
   ```bash
   # List deployments
   vercel ls
   
   # Rollback to previous deployment
   vercel rollback [deployment-url]
   ```

2. **Database**
   - Use Supabase point-in-time recovery
   - Or restore from latest backup

---

## 📞 Support

For deployment assistance, contact the development team with:
- Error messages
- Screenshots
- Environment details (without secrets)
