import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate authorization
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { eventId, tableId } = body

    if (!eventId || !tableId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Use database function to lock table atomically
    const { data, error } = await supabase.rpc('lock_event_table', {
      p_event_id: eventId,
      p_table_id: tableId,
      p_user_id: user.id,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message || 'Table lock failed' }, { status: 409 })
    }

    return NextResponse.json({ 
      success: true,
      lockId: data.lock_id,
      expiresAt: data.expires_at,
    })
  } catch (error) {
    console.error('Table lock error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const lockId = searchParams.get('lockId')

    if (!lockId) {
      return NextResponse.json({ error: 'Missing lock ID' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('release_table_lock', {
      p_lock_id: lockId,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Table unlock error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
