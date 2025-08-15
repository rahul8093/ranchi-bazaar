import { GraphQLClient } from "graphql-request";

export const saleorClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URI as string,
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
