// 
import { gql } from 'graphql-request';

export const GET_CHECKOUT_QUERY = gql`
  query GetCheckout($token: UUID!) {
    checkout(token: $token) {
      id
      email
      totalPrice {
        gross {
          amount
        }
      }
      lines {
        id
        quantity
        variant {
          id
          name
          pricing {
            price {
              gross {
                amount
              }
            }
          }
          product {
            name
            thumbnail {
              url
              alt
            }
          }
        }
      }
    }
  }
`;

export interface CheckoutLine {
  id: string;
  quantity: number;
  variant: {
    id: string;
    name: string;
    pricing: {
      price: {
        gross: {
          amount: number;
        };
      };
    };
    product: {
      name: string;
      thumbnail: {
        url: string;
        alt: string;
      };
    };
  };
}

export interface CheckoutData {
  checkout: {
    id: string;
    email: string;
    totalPrice: {
      gross: {
        amount: number;
      };
    };
    lines: CheckoutLine[];
  } | null;
}
