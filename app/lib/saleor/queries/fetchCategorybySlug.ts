import { gql } from "graphql-request";

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    category(slug: $slug) {
      id
      name
      slug
      description
    }
  }
`;

