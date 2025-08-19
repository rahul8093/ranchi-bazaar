import { gql } from "graphql-request";

export const GET_PRODUCT_BY_SLUG = gql`
query GetProductBySlug($slug: String!) {
  product(slug: $slug, channel: "default-channel") {
    id
    name
    slug
    description
    thumbnail {
      url
    }
    media {
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
    variants {
      id
      name
      sku
      pricing {
        price {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
}
`;
