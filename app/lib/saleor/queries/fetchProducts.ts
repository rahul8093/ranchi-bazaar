// lib/fetchProducts.ts
import { gql } from "@apollo/client";
import apolloClient from "../apolloClient.js";
import { ApolloError } from '@apollo/client';

// Define TypeScript interfaces for product data
export interface Product {
    id: string;
    name: string;
    description: string;
    pricing: { priceRange:{start:{gross:{amount:number}}} }
    thumbnail: {
        url: string;
        alt: string;
    };
}

interface ProductsData {
    products: {
        edges: {
            node: Product;
        }[];
    };
}

// GraphQL query to fetch products
const GET_PRODUCTS = gql`
  
query GetProducts {
  
  products(first: 6,channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          pricing {
            priceRange {
              start {
                gross{
                  amount
                }
              }
            }
          }
          thumbnail {
            url
            alt
          }
        }
      }
    }
  }
  
  

`;

// Function to fetch products
// export const fetchProducts = async (): Promise<Product[]> => {
//     try {
//         const { data } = await apolloClient.query<ProductsData>({
//             query: GET_PRODUCTS,
//         });
//         return data.products.edges.map(({ node }) => node); // Returning only the 'node' (product) data
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return []; // Return an empty array in case of error
//     }
// };

// lib/fetchProducts.ts


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apolloClient.query<ProductsData>({
      query: GET_PRODUCTS,
      
    });
console.log(data,'data');

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
