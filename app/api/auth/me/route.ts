import { NextResponse } from "next/server";
import { getServerAuthClient } from "@/app/lib/saleor/authClient";

const API_URL = process.env.NEXT_PUBLIC_API_URI!;

export async function GET() {
  // Create the GraphQL query for fetching user data
  const ME_QUERY = `query { me { id email firstName lastName } }`;

  try {
    // Get the authenticated client from Saleor
    const authClient = await getServerAuthClient();
    
    // Call the Saleor API with authentication headers
    const response = await authClient.fetchWithAuth(
      API_URL, // The API URL for Saleor
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: ME_QUERY }), // Wrap the query in an object
        cache: "no-store",
      }
    );
    
    // Parse the response to JSON
    const data = await response.json();

    // Check if we have valid user data
    if (data?.data?.me) {
      console.log(data,data?.data,data?.data?.me)
      return NextResponse.json({ user: data.data.me });
    } else {
      // If user data is not found, return an error
      console.error("❌ No user data found in the response.");
      return NextResponse.json({ user: null, error: "User not found" }, { status: 404 });
    }
  } catch (err) {
    // Log and return any errors encountered during the request
    console.error("❌ Error during the request:", err);
    return NextResponse.json({ user: null, error: "Failed to fetch user data" }, { status: 500 });
  }
}
