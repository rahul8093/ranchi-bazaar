// lib/fetchProducts.ts
import { gql } from "@apollo/client";
import apolloClient from "../apolloClient.js";
import { ApolloError } from '@apollo/client';

// Extend Product interface to include variants
export interface ProductVariant {
  id: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  pricing: { priceRange:{start:{gross:{amount:number}}} }
  thumbnail: {
    url: string;
    alt: string;
  };
  variants: ProductVariant[];  // Add this
}

interface ProductsData {
  products: {
    edges: {
      node: Product;
    }[];
  };
}

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 6, channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          pricing {
            priceRange {
              start {
                gross {
                  amount
                }
              }
            }
          }
          thumbnail {
            url
            alt
          }
          variants {
            id
          }
        }
      }
    }
  }
`;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apolloClient.query<ProductsData>({
      query: GET_PRODUCTS,
    });
    console.log(data, 'data');
    return data.products.edges.map(({ node }) => node);
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("Apollo error details:", error.message);
      console.error("Error response:", error.graphQLErrors);
      console.error("Network error:", error.networkError);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};
