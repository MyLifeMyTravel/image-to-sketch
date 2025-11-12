import { NextRequest, NextResponse } from 'next/server'
import { handleCreemWebhook } from '@/lib/creem'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('creem-signature') || ''

    // Handle the webhook
    const result = await handleCreemWebhook(
      JSON.parse(body),
      signature
    )

    if (!result.success) {
      console.error('Webhook processing failed')
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 400 }
      )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Creem webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}