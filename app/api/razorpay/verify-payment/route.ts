import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ADD_ORDER_NOTE_MUTATION } from "@/app/lib/saleor/mutations/addOrderNote";
import { MARK_ORDER_AS_PAID_MUTATION } from "@/app/lib/saleor/mutations/markOrderAsPaid";
import { COMPLETE_CHECKOUT_MUTATION } from "@/app/lib/saleor/mutations/completeCheckoutMutation";

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  saleor_order_id: string; // This is actually checkoutId
};

export async function POST(req: NextRequest) {
  const SALEOR_API_URL = process.env.NEXT_PUBLIC_API_URI;
  const SALEOR_TOKEN = process.env.NEXT_PUBLIC_TOKEN;

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    saleor_order_id, // This is the checkout ID
  }: VerifyBody = await req.json();

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  // Step 1: Complete the checkout to get the actual Order ID
  const completeCheckoutRes = await fetch(SALEOR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SALEOR_TOKEN}`,
    },
    body: JSON.stringify({
      query: COMPLETE_CHECKOUT_MUTATION,
      variables: { checkoutId: saleor_order_id },
    }),
  });

  const completeCheckoutJson = await completeCheckoutRes.json();
  const orderId = completeCheckoutJson?.data?.checkoutComplete?.order?.id;

  if (
    completeCheckoutJson.errors ||
    completeCheckoutJson.data?.checkoutComplete?.errors?.length > 0 ||
    !orderId
  ) {
    return NextResponse.json(
      { error: "Failed to complete checkout", details: completeCheckoutJson },
      { status: 500 }
    );
  }

  // Step 2: Mark order as paid
  const markPaidRes = await fetch(SALEOR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SALEOR_TOKEN}`,
    },
    body: JSON.stringify({
      query: MARK_ORDER_AS_PAID_MUTATION,
      variables: { id: orderId },
    }),
  });

  const markPaidJson = await markPaidRes.json();

  if (
    markPaidJson.errors ||
    markPaidJson.data?.orderMarkAsPaid?.errors?.length
  ) {
    return NextResponse.json(
      { error: "Failed to mark order as paid", details: markPaidJson },
      { status: 500 }
    );
  }

  // Step 3: Add optional order note
  await fetch(SALEOR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SALEOR_TOKEN}`,
    },
    body: JSON.stringify({
      query: ADD_ORDER_NOTE_MUTATION,
      variables: {
        orderId: orderId,
        message: `Payment received via Razorpay. Payment ID: ${razorpay_payment_id}`,
      },
    }),
  });

  return NextResponse.json({ success: true, orderId });
}
