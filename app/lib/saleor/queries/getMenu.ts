// lib/saleor/queries/getMenu.ts
import { gql } from "@apollo/client";

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menu(slug: "navbar") {
      id
      name
      items {
        id
        name
        url
        level
        page {
          id
          slug
          title
        }
        category {
          id
          name
          slug
        }
        collection {
          id
          name
          slug
        }
        parent {
          id
          name
        }
        children {
          id
          name
        }
      }
    }
  }
`;
