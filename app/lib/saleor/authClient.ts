import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorageAsync } from "@saleor/auth-sdk/next/server";

export const getServerAuthClient = async () => {
  const nextServerCookiesStorage = await getNextServerCookiesStorageAsync();
  return createSaleorAuthClient({
    saleorApiUrl: process.env.NEXT_PUBLIC_API_URI!,
    refreshTokenStorage: nextServerCookiesStorage,
    accessTokenStorage: nextServerCookiesStorage,
  });
};