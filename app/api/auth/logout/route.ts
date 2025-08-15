import { NextResponse } from "next/server";
import { clearAuthToken } from "@/app/lib/saleor/helpers/cookies.server";

export async function POST() {
  clearAuthToken();
  return NextResponse.json({ ok: true });
}
