import { gql } from "graphql-request";

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $redirectUrl: String!) {
    accountRegister(input: {
      email: $email
      password: $password
      redirectUrl: $redirectUrl
    }) {
      user {
        email
        firstName
        lastName
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CONFIRM_ACCOUNT_MUTATION = gql`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
      }
      errors {
        field
        message
      }
    }
  }
`;

export const GET_ME_QUERY = gql`
  query {
    me {
      id
      email
      firstName
    }
  }
`;

export const CHECKOUT_CREATE_MUTATION = gql`
  mutation CheckoutCreate($variantId: ID!, $quantity: Int!) {
    checkoutCreate(
      input: {
        lines: [{ quantity: $quantity, variantId: $variantId }]
        channel: "default-channel"
      }
    ) {
      checkout {
        id
        token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_LINES_ADD_MUTATION = gql`
  mutation CheckoutLinesAdd($checkoutToken: UUID!, $variantId: ID!, $quantity: Int!) {
    checkoutLinesAdd(
      token: $checkoutToken
      lines: [{ quantity: $quantity, variantId: $variantId }]
    ) {
      checkout {
        id
        token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_CUSTOMER_ATTACH_MUTATION = gql`
  mutation CheckoutCustomerAttach($checkoutToken: UUID!, $email: String!) {
    checkoutCustomerAttach(token: $checkoutToken, email: $email) {
      checkout {
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;


export const UPDATE_CHECKOUT_LINE_MUTATION = gql`
  mutation CheckoutLinesUpdate($token: UUID!, $lines: [CheckoutLineUpdateInput!]!) {
    checkoutLinesUpdate(token: $token, lines: $lines) {
      checkout {
        id
        token
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
      errors {
        field
        message
      }
    }
  }
`;


export const REMOVE_CHECKOUT_LINE_MUTATION = gql`
  mutation CheckoutLineDelete($token: UUID!, $lineId: ID!) {
    checkoutLineDelete(token: $token, lineId: $lineId) {
      checkout {
        id
        token
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
      errors {
        field
        message
      }
    }
  }
`;
