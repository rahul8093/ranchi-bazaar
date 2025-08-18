import { getServerAuthClient } from "@/app/lib/saleor/authClient";
import { NextRequest, NextResponse } from "next/server";
// import { getServerAuthClient } from "@/app/lib/authClient";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const authClient = await getServerAuthClient();

    // Call signIn to authenticate and get tokens
    const { data } = await authClient.signIn({ email, password });

    // // Tokens are automatically stored in the storage repositories
    // // e.g., cookies or localStorage

    // // Optionally, fetch the user's details after successful login
    // const ME_QUERY = `query { me { id email firstName lastName } }`;
    // const userResponse = await authClient.fetchWithAuth(ME_QUERY);
    console.log(data,'login data')

    return NextResponse.json({
      // user: userResponse.status,
      message: "Login successful",
      data:data
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error}, { status: 400 });
  }
}
