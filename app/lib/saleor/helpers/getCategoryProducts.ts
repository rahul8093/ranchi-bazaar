import { saleorClient } from "../../saleorClient";
import { GET_CATEGORY_PRODUCTS } from "../queries/getCategoryProducts";
import { GetProductsByCategoryResponse } from "../types/category";

export async function fetchProductsByCategoryId(categoryId: string, after?: string, first: number = 10) {
  try {
    const data: GetProductsByCategoryResponse = await saleorClient.request(
      GET_CATEGORY_PRODUCTS,
      {  categoryId, first, after }
    );
        return {
      products: data.products.edges.map(edge => edge.node),
      endCursor: data.products.pageInfo.endCursor,
      hasNextPage: data.products.pageInfo.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return { products: [], endCursor: null, hasNextPage: false };
  }
}
