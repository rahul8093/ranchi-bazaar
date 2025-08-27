export interface ShippingMethod  {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
};

export interface ShippingMethodsResponse  {
  checkout: {
    availableShippingMethods: ShippingMethod[];
  } | null;
};

export interface SetShippingMethodResponse {
  checkoutShippingMethodUpdate: {
    errors: {
      field: string | null;
      message: string;
    }[];
    checkout: {
      id: string;
      shippingMethod: {
        id: string;
        name: string;
      } | null;
    } | null;
  };
};
