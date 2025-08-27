import { gql } from 'graphql-request'
import {saleorClient} from '../../saleorClient'
import {SetShippingMethodResponse, ShippingMethodsResponse} from '../types/shipping'

const SHIPPING_METHODS_QUERY = gql`
  query GetShippingMethods($token: UUID!) {
    checkout(token: $token) {
      availableShippingMethods {
        id
        name
        price {
          amount
          currency
        }
      }
    }
  }
`

export async function fetchAvailableShippingMethods(token: string) {
  try {
    const result = await saleorClient.request<ShippingMethodsResponse>(
      SHIPPING_METHODS_QUERY,
      { token }
    );

    return result.checkout?.availableShippingMethods ?? [];
  } catch (error) {
    console.error("Failed to fetch shipping methods:", error);
    throw error;
  }
}

const UPDATE_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
      errors {
        field
        message
      }
      checkout {
        id
        shippingMethod {
          id
          name
        }
      }
    }
  }
`

export async function setShippingMethod(token: string, shippingMethodId: string) {
  const checkoutId = Buffer.from(`Checkout:${token}`).toString('base64');

  const result = await saleorClient.request<SetShippingMethodResponse>(
    UPDATE_SHIPPING_METHOD,
    {
      checkoutId,
      shippingMethodId,
    }
  );

  const errors = result.checkoutShippingMethodUpdate?.errors || [];
  return {
    success: errors.length === 0,
    errors,
    checkout: result.checkoutShippingMethodUpdate.checkout,
  };
}

