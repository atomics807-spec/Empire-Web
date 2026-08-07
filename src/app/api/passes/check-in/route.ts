import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/admin'
import { createHash } from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // Hash the token to compare with stored hash
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const pepper = process.env.QR_TOKEN_PEPPER || 'default-pepper'
    const pepperedHash = createHash('sha256').update(tokenHash + pepper).digest('hex')

    const supabase = await createClient()

    // Verify the staff user (bouncer)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized - Bouncer authentication required' }, { status: 401 })
    }

    // Verify user has bouncer role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'bouncer') {
      return NextResponse.json({ error: 'Unauthorized - Bouncer role required' }, { status: 403 })
    }

    // Find the pass using atomic check-in function
    const { data, error } = await supabase.rpc('atomic_check_in_pass', {
      p_token_hash: pepperedHash,
      p_staff_id: user.id,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data.success) {
      return NextResponse.json({
        success: false,
        status: data.status,
        message: data.message,
      }, { status: 200 })
    }

    return NextResponse.json({
      success: true,
      status: 'valid',
      message: 'Check-in successful',
      passId: data.pass_id,
      eventTitle: data.event_title,
      guestCount: data.guest_count,
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
