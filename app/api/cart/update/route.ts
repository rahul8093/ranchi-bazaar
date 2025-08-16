import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UPDATE_CHECKOUT_LINE_MUTATION } from "@/app/lib/mutations";
import { saleorClient } from "@/app/lib/saleorClient";
import { CheckoutLinesUpdateResponse } from "@/app/lib/saleor/types";

const CHECKOUT_COOKIE = "checkoutToken";
const ONE_WEEK = 60 * 60 * 24 * 7;


export async function POST(req: NextRequest) {
  const { lineId, quantity } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get(CHECKOUT_COOKIE)?.value;
  console.log(token,'token')

  if (!token) {
    return NextResponse.json(
      { error: "No checkout token found" },
      { status: 400 }
    );
  }

  try {
    const result = await saleorClient.request<CheckoutLinesUpdateResponse>(
      UPDATE_CHECKOUT_LINE_MUTATION,
      {
        token,
        lines: [{ lineId, quantity }],
      }
    );

    if (result.checkoutLinesUpdate?.errors?.length) {
      return NextResponse.json(
        { error: result.checkoutLinesUpdate.errors[0].message },
        { status: 400 }
      );
    }

    // If new token returned, update cookie
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
    console.error(error);
    // console.error("Update Cart Item Error:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}
