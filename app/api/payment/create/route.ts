import { NextRequest, NextResponse } from 'next/server'
import { creemService } from '@/lib/creem'
import { createSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { planId, userId } = await request.json()

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // Get user from Supabase
    const supabase = createSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get plan details from config
    const { pricingPlans } = await import('@/config/pricing')
    const plan = pricingPlans.find(p => p.id === planId)

    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    let paymentResult

    if (plan.billingPeriod === 'lifetime' || plan.billingPeriod === 'monthly' || plan.billingPeriod === 'yearly') {
      // Handle subscription
      paymentResult = await creemService.createSubscription({
        planId,
        userId: user.id,
        metadata: {
          planName: plan.name,
          amount: plan.price,
          currency: plan.currency,
          billingPeriod: plan.billingPeriod,
          credits: plan.credits
        }
      })
    } else {
      // Handle one-time payment
      paymentResult = await creemService.createPayment({
        amount: plan.price,
        currency: plan.currency,
        planId,
        userId: user.id,
        metadata: {
          planName: plan.name,
          credits: plan.credits
        }
      })
    }

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error || 'Failed to create payment' },
        { status: 500 }
      )
    }

    // Log payment attempt to database
    const { error: logError } = await supabase
      .from('payment_logs')
      .insert({
        user_id: user.id,
        plan_id: planId,
        amount: plan.price,
        currency: plan.currency,
        status: 'pending',
        payment_id: paymentResult.paymentId,
        subscription_id: paymentResult.subscriptionId,
        created_at: new Date().toISOString()
      })

    if (logError) {
      console.error('Failed to log payment:', logError)
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResult.paymentUrl,
      clientSecret: paymentResult.clientSecret,
      paymentId: paymentResult.paymentId,
      subscriptionId: paymentResult.subscriptionId
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}