export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  pricing: {
    price: {
      gross: {
        amount: number;
        currency: string;
      };
    };
  };
}

export interface ProductMedia {
  url: string;
}

export interface ProductThumbnail {
  url: string;
}

export interface ProductPricing {
  priceRange: {
    start: {
      gross: {
        amount: number;
        currency: string;
      };
    };
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail?: ProductThumbnail;
  media?: ProductMedia[];
  pricing?: ProductPricing;
  variants: ProductVariant[];
}

export interface GetProductBySlugResponse {
  product: Product | null;
}
