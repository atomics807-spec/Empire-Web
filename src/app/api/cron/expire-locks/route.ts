import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()

    // Release expired table locks
    const { data: expiredLocks } = await supabase
      .from('event_tables')
      .update({ 
        status: 'available',
        locked_by: null,
        locked_at: null,
        lock_expires_at: null,
      })
      .eq('status', 'locked')
      .lt('lock_expires_at', new Date().toISOString())
      .select('id, event_id, physical_table_id')

    return NextResponse.json({
      success: true,
      locksReleased: (expiredLocks || []).length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Expire locks error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
