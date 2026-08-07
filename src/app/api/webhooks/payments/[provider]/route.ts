import { NextRequest, NextResponse } from 'next/server'
import { getPaymentProvider, type PaymentProviderType } from '@/lib/payments/provider'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  
  // Validate provider
  const validProviders: PaymentProviderType[] = ['campay', 'monetbil', 'sandbox']
  if (!validProviders.includes(provider as PaymentProviderType)) {
    return NextResponse.json(
      { error: 'Invalid payment provider' },
      { status: 400 }
    )
  }

  try {
    const paymentProvider = getPaymentProvider(provider as PaymentProviderType)
    
    // Verify webhook signature
    const verifiedEvent = await paymentProvider.verifyWebhook(request)
    
    if (!verifiedEvent.signatureValid) {
      console.error('Invalid webhook signature:', {
        provider,
        eventId: verifiedEvent.eventId,
      })
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Get admin client
    const supabase = await createAdminClient()

    // Store raw webhook event for debugging
    const { error: eventError } = await supabase.from('payment_events').insert({
      provider: provider,
      provider_event_id: verifiedEvent.eventId,
      event_type: verifiedEvent.eventType,
      signature_valid: verifiedEvent.signatureValid,
      sanitized_payload: verifiedEvent.rawPayload,
      processing_status: 'received',
      received_at: new Date().toISOString(),
    })

    if (eventError) {
      console.error('Failed to store payment event:', eventError)
    }

    // Find the payment by provider reference
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('provider_reference', verifiedEvent.providerReference)
      .single()

    if (paymentError || !payment) {
      console.error('Payment not found:', verifiedEvent.providerReference)
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Update payment status based on verified event
    const statusUpdate: Record<string, any> = {
      status: verifiedEvent.status,
      updated_at: new Date().toISOString(),
    }

    if (verifiedEvent.status === 'successful') {
      statusUpdate.confirmed_at = new Date().toISOString()
    } else if (verifiedEvent.status === 'failed') {
      statusUpdate.failed_at = new Date().toISOString()
    }

    // Update payment record
    const { error: updateError } = await supabase
      .from('payments')
      .update(statusUpdate)
      .eq('id', payment.id)

    if (updateError) {
      console.error('Failed to update payment:', updateError)
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      )
    }

    // Process business logic based on payment type and status
    if (verifiedEvent.status === 'successful') {
      await processSuccessfulPayment(supabase, payment, verifiedEvent)
    }

    // Mark webhook event as processed
    await supabase
      .from('payment_events')
      .update({
        payment_reference: payment.id,
        processing_status: 'processed',
        processed_at: new Date().toISOString(),
      })
      .eq('provider_event_id', verifiedEvent.eventId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processSuccessfulPayment(
  supabase: any,
  payment: any,
  event: any
) {
  try {
    switch (payment.target_type) {
      case 'order':
        // Update order to paid
        await supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_status: 'paid',
            paid_at: new Date().toISOString(),
          })
          .eq('id', payment.target_id)
        break

      case 'reservation':
        // Confirm reservation
        await supabase
          .from('reservations')
          .update({
            status: 'confirmed',
            payment_status: 'successful',
          })
          .eq('id', payment.target_id)
        
        // Update event table to reserved
        const { data: reservation } = await supabase
          .from('reservations')
          .select('event_table_id')
          .eq('id', payment.target_id)
          .single()
        
        if (reservation) {
          await supabase
            .from('event_tables')
            .update({ status: 'reserved' })
            .eq('id', reservation.event_table_id)
        }
        break

      case 'ticket_order':
        // Confirm ticket order
        await supabase
          .from('event_ticket_orders')
          .update({
            status: 'paid',
            payment_status: 'paid',
            paid_at: new Date().toISOString(),
          })
          .eq('id', payment.target_id)
        break
    }
  } catch (error) {
    console.error('Error processing successful payment:', error)
    throw error
  }
}
