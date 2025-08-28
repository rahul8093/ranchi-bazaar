import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CHECKOUT_CREATE_MUTATION,
  CHECKOUT_LINES_ADD_MUTATION,
  CHECKOUT_BY_TOKEN_QUERY,
} from "@/app/lib/mutations";
import { saleorClient } from "@/app/lib/saleorClient";
import { clearCheckoutToken } from "@/app/lib/saleor/helpers/cookies.client";

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

type CheckoutByTokenResponse = {
  checkout: {
    id: string;
    token: string;
  } | null;
};

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json();
  const cookieStore = await cookies();
  let token = cookieStore.get(CHECKOUT_COOKIE)?.value;

  try {
    // Validate existing token
    if (token) {
      const { checkout } = await saleorClient.request<CheckoutByTokenResponse>(
        CHECKOUT_BY_TOKEN_QUERY,
        { token }
      );

      if (!checkout) {
        clearCheckoutToken(); // Clear invalid token
        token = undefined;
      }
    }

    // If token is missing or invalid, create a new checkout
    if (!token) {
      const { checkoutCreate } = await saleorClient.request<CheckoutCreateResponse>(
        CHECKOUT_CREATE_MUTATION,
        { variantId, quantity }
      );

      const newToken = checkoutCreate?.checkout?.token;

      if (!newToken) {
        return NextResponse.json(
          { error: "Checkout creation failed" },
          { status: 500 }
        );
      }

      // Set new token in cookie
      const response = NextResponse.json({
        success: true,
        checkout: { token: newToken },
      });

      response.cookies.set(CHECKOUT_COOKIE, newToken, {
        path: "/",
        maxAge: ONE_WEEK,
      });

      return response;
    }

    // Add line item to checkout
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
