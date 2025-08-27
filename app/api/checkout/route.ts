import {
  updateShippingAddress,
  updateCheckoutEmail,
  completeCheckout,
  updateBillingAddress,
  createCheckoutPayment,
} from '@/app/lib/saleor/helpers/checkout'

import {
  fetchAvailableShippingMethods,
  setShippingMethod,
} from '@/app/lib/saleor/helpers/fetchAvailableShippingMethods'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('📦 Request body:', body)

    const { email, address, totalPrice } = body
    const token = (await cookies()).get('checkoutToken')?.value

    console.log('🔑 Checkout Token:', token)

    if (!token)
      return NextResponse.json({ error: 'No checkout session' }, { status: 400 })

    // 1. Update shipping address
    const ship = await updateShippingAddress(token, address)
    console.log('🚚 Shipping address response:', ship)

    if (!ship.success)
      return NextResponse.json({ error: 'Invalid address', details: ship.errors }, { status: 400 })

    // 2. Update billing address
    const bill = await updateBillingAddress(token, address)
    console.log('🏦 Billing address response:', bill)

    if (!bill.success)
      return NextResponse.json({ error: 'Invalid billing address', details: bill.errors }, { status: 400 })

    // 3. Update email
    const emailRes = await updateCheckoutEmail(token, email)
    console.log('📧 Email update response:', emailRes)

    if (!emailRes.success)
      return NextResponse.json({ error: 'Invalid email', details: emailRes.errors }, { status: 400 })

    // 4. Fetch and set shipping method
    const methods = await fetchAvailableShippingMethods(token)
    console.log('🚛 Available shipping methods:', methods)

    if (!methods.length)
      return NextResponse.json({ error: 'No shipping methods available' }, { status: 400 })

    const method = methods[0]
    const methodRes = await setShippingMethod(token, method.id)
    console.log('✅ Shipping method set response:', methodRes)

    if (!methodRes.success)
      return NextResponse.json({ error: 'Failed to set shipping method', details: methodRes.errors }, { status: 400 })

    // 5. Create payment to trigger Razorpay webhook
    const checkoutId = ship.checkout.id
    console.log('💳 Creating payment for checkout:', checkoutId)

    const paymentCreateRes = await createCheckoutPayment({
      checkoutId,
      amount: totalPrice,
      gateway: 'RazorPay payment gateway',
    })
    console.log('💰 Payment creation response:', paymentCreateRes)

    if (!paymentCreateRes.success) {
      return NextResponse.json({ error: 'Failed to create payment', details: paymentCreateRes.errors }, { status: 400 })
    }

    // 6. Optional: Delay to wait for Razorpay webhook to initialize
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 7. Complete checkout
    const completed = await completeCheckout(token)
    console.log('✅ Checkout completion response:', completed)

    if (!completed.success)
      return NextResponse.json({ error: 'Checkout failed', details: completed.errors }, { status: 400 })

    const saleorOrder = completed.order

    return NextResponse.json({
      order: saleorOrder,
      message: 'Checkout and Razorpay session initialized',
    })
  } catch (err) {
    console.error('❌ Error in /api/checkout:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}