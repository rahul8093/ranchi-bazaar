import { NextResponse } from "next/server";
// import { getAuthToken } from "@/app/lib/saleor/helpers/cookies.server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URI!;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    console.log("❌ No auth token");
    return NextResponse.json({ user: null });
  }

  const ME_QUERY = `query { me { id email firstName lastName } }`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: ME_QUERY }),
    cache: "no-store",
  });

  const text = await res.text(); // read raw body instead of json
  console.log("🧪 Saleor response text:", text);

  try {
    const json = JSON.parse(text);
    return NextResponse.json({ user: json.data?.me ?? null });
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return NextResponse.json({ user: null, error: "Invalid JSON response" });
  }
}

