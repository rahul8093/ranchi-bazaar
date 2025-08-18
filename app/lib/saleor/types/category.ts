export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  thumbnail?: {
    url: string;
  } | null;
  pricing?: {
    priceRange?: {
      start?: {
        gross?: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

export interface GetCategoryResponse {
  category: Category | null;
}

export interface GetProductsByCategoryResponse {
  products: {
    edges: {
      node: Product;
      cursor: string;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

