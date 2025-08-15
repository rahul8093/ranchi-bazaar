"use server";
import { cookies } from "next/headers";

const AUTH_COOKIE = "authToken";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function setAuthToken(token: string) {
  (await cookies()).set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK,
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  return (await cookies()).get(AUTH_COOKIE)?.value;
}

export async function clearAuthToken() {
  (await cookies()).delete(AUTH_COOKIE);
}
