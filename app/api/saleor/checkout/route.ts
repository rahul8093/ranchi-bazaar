import { createCheckout } from '@/app/lib/saleor/helpers/checkout';
import { NextRequest, NextResponse } from 'next/server';
// import { createCheckout } from '@/lib/saleor/helpers/checkout';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, lines } = body;

    if (!email || !lines?.length) {
      return NextResponse.json({ error: 'Missing email or cart items' }, { status: 400 });
    }

    const checkoutData = await createCheckout(email, lines);

    return NextResponse.json(checkoutData);
  } catch (error) {
    console.error('Error in /api/saleor/checkout:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
