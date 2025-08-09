import { gql } from '@apollo/client';

export const CREATE_CHECKOUT_MUTATION = gql`
  mutation CheckoutCreate($email: String!, $lines: [CheckoutLineInput!]!, $channel: String!) {
    checkoutCreate(input: { email: $email, lines: $lines, channel: $channel }) {
      checkout {
        id
        token
        email
        totalPrice {
          gross {
            amount
            currency
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
