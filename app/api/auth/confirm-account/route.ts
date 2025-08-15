// app/api/auth/confirm-account/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SALEOR_API_URL = process.env.NEXT_PUBLIC_API_URI!;

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();

  try {
    const res = await fetch(SALEOR_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation ConfirmAccount($email: String!, $token: String!) {
            confirmAccount(email: $email, token: $token) {
              accountErrors {
                field
                message
              }
            }
          }
        `,
        variables: { email, token },
      }),
    });

    const json = await res.json();
    const errors = json.data?.confirmAccount?.accountErrors ?? [];

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Confirm Account Error]', err);
    return NextResponse.json(
      { success: false, errors: [{ message: 'Server error' }] },
      { status: 500 }
    );
  }
}
