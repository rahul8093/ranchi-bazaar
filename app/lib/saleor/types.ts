export interface CheckoutLine {
  id: string;
  quantity: number;
  variant: {
    id: string;
    name: string;
    pricing: {
      price: {
        gross: {
          amount: number;
        };
      };
    };
    product: {
      name: string;
      thumbnail: {
        url: string;
        alt: string;
      };
    };
  };
}

export interface Checkout {
  id: string;
  token: string;
  lines: CheckoutLine[];
}

export interface CheckoutLinesUpdateResponse {
  checkoutLinesUpdate: {
    checkout: Checkout | null;
    errors: Array<{ field: string; message: string }>;
  };
}
export interface CheckoutLineDeleteResponse {
  checkoutLineDelete: {
    checkout: Checkout | null;
    errors: Array<{ field: string; message: string }>;
  };
}

