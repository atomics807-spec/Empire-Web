import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for use in the browser
 * Uses the public (publishable) keys only
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
