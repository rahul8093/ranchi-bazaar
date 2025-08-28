import { gql } from "graphql-request";

export const COMPLETE_CHECKOUT_MUTATION = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors {
        field
        message
      }
      order {
        id
        number
        paymentStatus
      }
    }
  }
`;