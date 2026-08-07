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

    // Find stale pending payments (older than 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()

    const { data: stalePayments } = await supabase
      .from('payments')
      .select('id, provider_reference, status')
      .eq('status', 'pending')
      .lt('created_at', thirtyMinutesAgo)

    const results = {
      processed: 0,
      failed: 0,
      details: [] as { paymentId: string; action: string; result: string }[]
    }

    for (const payment of stalePayments || []) {
      try {
        // In production, call the payment provider's status API
        // For now, mark as failed if stale
        const { error } = await supabase
          .from('payments')
          .update({ 
            status: 'failed',
            failure_code: 'TIMEOUT',
            failure_message: 'Payment timed out during reconciliation'
          })
          .eq('id', payment.id)

        if (error) {
          results.failed++
          results.details.push({
            paymentId: payment.id,
            action: 'update_status',
            result: 'failed'
          })
        } else {
          results.processed++
          results.details.push({
            paymentId: payment.id,
            action: 'mark_failed',
            result: 'success'
          })
        }
      } catch (err) {
        results.failed++
      }
    }

    // Also expire abandoned reservations
    const { data: abandonedReservations } = await supabase
      .from('reservations')
      .select('id')
      .eq('status', 'pending_payment')
      .lt('created_at', thirtyMinutesAgo)

    for (const res of abandonedReservations || []) {
      await supabase
        .from('reservations')
        .update({ status: 'expired' })
        .eq('id', res.id)
    }

    return NextResponse.json({
      success: true,
      paymentsProcessed: results.processed,
      paymentsFailed: results.failed,
      reservationsExpired: (abandonedReservations || []).length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Reconciliation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
