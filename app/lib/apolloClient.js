// lib/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    // uri: 'https://store-f6owkh2b.saleor.cloud/graphql/',
    uri: process.env.NEXT_PUBLIC_API_URI,
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default apolloClient;
