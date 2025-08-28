// app/api/razorpay/create-order/route.ts

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

interface CreateOrderBody {
  amount: number; // in decimal, e.g. 123.45
  currency?: string;
  receipt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderBody = await req.json();

    if (!body.amount || !body.receipt) {
      return NextResponse.json(
        { error: "Missing required fields: amount or receipt" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(body.amount * 100), // convert rupees to paise (integer)
      currency: body.currency || "INR",
      receipt: `order_${Date.now()}`||body.receipt,
      payment_capture: true, // auto capture payment
    });

    console.log(order,'order')

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
