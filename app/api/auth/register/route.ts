// app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    const REGISTER_MUTATION = `
      mutation RegisterUser($input: AccountRegisterInput!) {
        accountRegister(input: $input) {
          user {
            id
            email
            firstName
            lastName
          }
          accountErrors {
            field
            message
            code
          }
        }
      }
    `;

    const variables = {
      input: {
        email,
        password,
        firstName,
        lastName,
        channel: process.env.NEXT_PUBLIC_CHANNEL || "default-channel",
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`
      },
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_URI!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: REGISTER_MUTATION, variables }),
    });

    const json = await res.json();


    if (json.data?.accountRegister?.accountErrors?.length) {
      return NextResponse.json(
        { errors: json.data.accountRegister.accountErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ user: json.data.accountRegister.user });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
