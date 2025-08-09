import { getServerAuthClient } from "@/app/lib/saleor/authClient";
import { NextRequest, NextResponse } from "next/server";
// import { getServerAuthClient } from "@/lib/saleor/authClient";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const authClient = getServerAuthClient();

  const result = await authClient.tokenCreate({ email, password });

  if (!result.isSuccess) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
