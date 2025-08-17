import { getServerAuthClient } from "@/app/lib/saleor/authClient";
import { NextResponse } from "next/server";

export async function POST() {
  const authClient = await getServerAuthClient();

  authClient.signOut();

  return NextResponse.json({ ok: true });
}
