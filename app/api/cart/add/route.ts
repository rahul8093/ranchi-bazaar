import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CHECKOUT_CREATE_MUTATION,
  CHECKOUT_LINES_ADD_MUTATION,
} from "@/app/lib/mutations";
import { saleorClient } from "@/app/lib/saleorClient";

const CHECKOUT_COOKIE = "checkoutToken";
const ONE_WEEK = 60 * 60 * 24 * 7;

type CheckoutCreateResponse = {
  checkoutCreate: {
    checkout: {
      token: string;
    } | null;
    errors?: { field: string; message: string }[];
  };
};

type CheckoutLinesAddResponse = {
  checkoutLinesAdd: {
    errors?: { field: string; message: string }[];
  };
};

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get(CHECKOUT_COOKIE)?.value;

  try {
    if (!token) {
      const result = await saleorClient.request<CheckoutCreateResponse>(
        CHECKOUT_CREATE_MUTATION,
        { variantId, quantity }
      );

      const newToken = result.checkoutCreate?.checkout?.token;
      console.log(newToken,'checkouttoken')
      console.log(result,'result')
      console.log(JSON.stringify(result, null, 2));


      if (!newToken) {
        return NextResponse.json({ error: "Checkout creation failed" }, { status: 500 });
      }

      const response = NextResponse.json({ success: true });
      response.cookies.set(CHECKOUT_COOKIE, newToken, {
        path: "/",
        maxAge: ONE_WEEK,
      });

      return response;
    }

    const result = await saleorClient.request<CheckoutLinesAddResponse>(
      CHECKOUT_LINES_ADD_MUTATION,
      {
        checkoutToken: token,
        variantId,
        quantity,
      }
    );

    if (result.checkoutLinesAdd?.errors?.length) {
      return NextResponse.json(
        { error: result.checkoutLinesAdd.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
