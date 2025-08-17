import { gql } from "graphql-request";

export const GET_CATEGORY_PRODUCTS = gql`
  query GetProductsByCategoryId($categoryId: ID!, $first: Int = 10) {
  products(
    first: $first
    filter: { categories: [$categoryId] }
    sortBy: { field: NAME, direction: ASC }
    channel: "default-channel"
  ) {
    edges {
      node {
        id
        name
        slug
        thumbnail {
          url
        }
        pricing {
          priceRange {
            start {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
  }
}

`;


