// app/api/cart/remove/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UPDATE_CHECKOUT_LINE_MUTATION } from "@/app/lib/mutations";
import { saleorClient } from "@/app/lib/saleorClient";
import { CheckoutLinesUpdateResponse } from "@/app/lib/saleor/types";

const CHECKOUT_COOKIE = "checkoutToken";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  const { lineId } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get(CHECKOUT_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "No checkout token found" }, { status: 400 });
  }

  if (!lineId) {
    return NextResponse.json({ error: "Missing lineId" }, { status: 400 });
  }

  try {
    const result = await saleorClient.request<CheckoutLinesUpdateResponse>(
      UPDATE_CHECKOUT_LINE_MUTATION,
      {
        token,
        lines: [{ lineId, quantity: 0 }],
      }
    );

    const errors = result.checkoutLinesUpdate?.errors;
    if (errors?.length) {
      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    const newToken = result.checkoutLinesUpdate.checkout?.token;
    const response = NextResponse.json({ success: true });

    if (newToken && newToken !== token) {
      response.cookies.set(CHECKOUT_COOKIE, newToken, {
        path: "/",
        maxAge: ONE_WEEK,
      });
    }

    return response;
  } catch (error) {
    console.error("Remove from cart error:", error);
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 });
  }
}
