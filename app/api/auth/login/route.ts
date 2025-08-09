import { getServerAuthClient } from "@/app/lib/saleor/authClient";
import { NextRequest, NextResponse } from "next/server";
// import { getServerAuthClient } from "@/lib/saleor/authClient";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const authClient = getServerAuthClient();

  const result = await authClient.signIn({ email, password });

  if (!result.data.tokenCreate.refreshToken) {
    return NextResponse.json({ error: result.data.tokenCreate.errors }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
