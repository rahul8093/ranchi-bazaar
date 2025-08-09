// lib/saleor/authClient.ts
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorage } from "@saleor/auth-sdk/next/server";

export const getServerAuthClient = () => {
  const cookieStorage = getNextServerCookiesStorage();

  return createSaleorAuthClient({
    saleorApiUrl: process.env.NEXT_PUBLIC_API_URI!,
    refreshTokenStorage: cookieStorage,
    accessTokenStorage: cookieStorage,
  });
};
