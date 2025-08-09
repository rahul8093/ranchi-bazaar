import apolloClient from '../apolloClient';
import { CREATE_CHECKOUT_MUTATION } from '../mutations/createCheckout';

interface CheckoutLineInput {
  quantity: number;
  variantId: string;
}

export async function createCheckout(email: string, lines: CheckoutLineInput[]) {
  const variables = {
    email,
    lines,
    channel: 'default-channel',
  };

  const { data, errors } = await apolloClient.mutate({
    mutation: CREATE_CHECKOUT_MUTATION,
    variables,
  });

  if (errors) {
    console.error('Checkout creation GraphQL errors:', errors);
    throw new Error('Failed to create checkout');
  }

  return data.checkoutCreate;
}
