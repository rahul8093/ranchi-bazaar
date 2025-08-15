import { NextRequest, NextResponse } from "next/server";
import { setAuthToken } from "@/app/lib/saleor/helpers/cookies.server";

const API_URL = process.env.NEXT_PUBLIC_API_URI!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const TOKEN_CREATE = `
    mutation TokenCreate($email: String!, $password: String!) {
      tokenCreate(email: $email, password: $password) {
        token
        refreshToken
        errors { field message }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: TOKEN_CREATE, variables: { email, password } }),
    cache: "no-store",
  });

  const json = await res.json();

  const { token, errors } = json?.data?.tokenCreate ?? {};
  if (!token) {
    return NextResponse.json(
      { error: errors ?? [{ message: "Invalid credentials" }] },
      { status: 400 }
    );
  }

  // Set httpOnly cookie
  await setAuthToken(token);

  // Fetch current user
  const ME_QUERY = `query { me { id email firstName lastName } }`;
  const meRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: ME_QUERY }),
    cache: "no-store",
  });
  const meJson = await meRes.json();

  return NextResponse.json({
    user: meJson.data?.me ?? null,
  });
}
