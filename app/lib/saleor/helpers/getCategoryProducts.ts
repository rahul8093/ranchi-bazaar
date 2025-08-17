import { saleorClient } from "../../saleorClient";
import { GET_CATEGORY_PRODUCTS } from "../queries/getCategoryProducts";
import { GetProductsByCategoryResponse } from "../types/category";

export async function fetchProductsByCategoryId(categoryId: string) {
  try {
    const data: GetProductsByCategoryResponse = await saleorClient.request(
      GET_CATEGORY_PRODUCTS,
      { categoryId }
    );
    return data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
