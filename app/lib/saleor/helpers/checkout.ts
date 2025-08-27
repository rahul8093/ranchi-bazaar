// import apolloClient from '../apolloClient';
// import { CREATE_CHECKOUT_MUTATION } from '../mutations/createCheckout';
import client from '@/app/lib/saleor/apolloClient'
import {
  CHECKOUT_SHIPPING_ADDRESS_UPDATE,
  CHECKOUT_EMAIL_UPDATE,
  CHECKOUT_COMPLETE,
  CHECKOUT_BILLING_ADDRESS_UPDATE,
  CHECKOUT_PAYMENT_CREATE
} from '../mutations/checkout'


// interface CheckoutLineInput {
//   quantity: number;
//   variantId: string;
// }

// export async function createCheckout(email: string, lines: CheckoutLineInput[]) {
//   const variables = {
//     email,
//     lines,
//     channel: 'default-channel',
//   };

//   const { data, errors } = await apolloClient.mutate({
//     mutation: CREATE_CHECKOUT_MUTATION,
//     variables,
//   });

//   if (errors) {
//     console.error('Checkout creation GraphQL errors:', errors);
//     throw new Error('Failed to create checkout');
//   }

//   return data.checkoutCreate;
// }

type ShippingAddressInput = {
  firstName: string
  lastName: string
  phone?: string
  streetAddress1: string
  city: string
  postalCode: string
  country: string // e.g. 'US'
}

export const updateShippingAddress = async (token: string, address: ShippingAddressInput) => {
  const checkoutId = Buffer.from(`Checkout:${token}`).toString('base64');
  const { data } = await client.mutate({
    mutation: CHECKOUT_SHIPPING_ADDRESS_UPDATE,
    variables: {
      checkoutId,
      shippingAddress: address,
    },
  })

  const errors = data?.checkoutShippingAddressUpdate?.errors
  return {
    success: !errors?.length,
    errors,
    checkout: data?.checkoutShippingAddressUpdate?.checkout,
  }
}

export const updateCheckoutEmail = async (token: string, email: string) => {
    const checkoutId = Buffer.from(`Checkout:${token}`).toString('base64');
  const { data } = await client.mutate({
    mutation: CHECKOUT_EMAIL_UPDATE,
    variables: {
      checkoutId,
      email,
    },
  })

  const errors = data?.checkoutEmailUpdate?.errors
  return {
    success: !errors?.length,
    errors,
    checkout: data?.checkoutEmailUpdate?.checkout,
  }
}

export const completeCheckout = async (token: string) => {
  const checkoutId = Buffer.from(`Checkout:${token}`).toString('base64');
  const { data } = await client.mutate({
    mutation: CHECKOUT_COMPLETE,
    variables: {
      checkoutId,
    },
  })

  const errors = data?.checkoutComplete?.errors
  return {
    success: !errors?.length,
    errors,
    order: data?.checkoutComplete?.order,
  }
}

export const updateBillingAddress = async (token: string, address: ShippingAddressInput) => {
  const checkoutId = Buffer.from(`Checkout:${token}`).toString('base64')
  const { data } = await client.mutate({
    mutation: CHECKOUT_BILLING_ADDRESS_UPDATE,
    variables: {
      checkoutId,
      billingAddress: address,
    },
  })

  const errors = data?.checkoutBillingAddressUpdate?.errors
  return {
    success: !errors?.length,
    errors,
    checkout: data?.checkoutBillingAddressUpdate?.checkout,
  }
}


export async function createCheckoutPayment({
  checkoutId,
  amount,
  gateway,
}: {
  checkoutId: string
  amount: number
  gateway: string
}) {
  const { data } = await client.mutate({
    mutation: CHECKOUT_PAYMENT_CREATE,
    variables: {
      checkoutId,
      input: {
        amount,
        gateway,
      },
    },
  })

  const errors = data?.checkoutPaymentCreate?.errors || []
  const success = errors.length === 0

  return {
    success,
    errors,
    payment: data?.checkoutPaymentCreate?.payment,
  }
}