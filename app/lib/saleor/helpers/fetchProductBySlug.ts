import { saleorClient } from "../../saleorClient";
import { GET_PRODUCT_BY_SLUG } from "../queries/fetchProductBySlug";
import type { GetProductBySlugResponse } from "../types/product";

export async function fetchProductBySlug(slug: string) {
  try {
    const { product }: GetProductBySlugResponse = await saleorClient.request(
      GET_PRODUCT_BY_SLUG,
      { slug }
    );
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
