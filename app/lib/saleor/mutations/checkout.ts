import { gql } from '@apollo/client';

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE = gql`
  mutation CheckoutShippingAddressUpdate(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      checkout {
        id
        shippingAddress {
          firstName
          lastName
          streetAddress1
          city
          country {
            code
          }
          postalCode
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_EMAIL_UPDATE = gql`
  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
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

export const CHECKOUT_COMPLETE = gql`
  mutation CheckoutComplete($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      order {
        id
        number
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_BILLING_ADDRESS_UPDATE = gql`
  mutation CheckoutBillingAddressUpdate($checkoutId: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress) {
      checkout {
        id
      }
      errors {
        field
        message
      }
    }
  }
`

export const CHECKOUT_PAYMENT_CREATE = gql`
  mutation CheckoutPaymentCreate($checkoutId: ID!, $input: PaymentInput!) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $input) {
      payment {
        id
      }
      errors {
        field
        message
      }
    }
  }
`