// lib/saleor/helpers/fetchCategoryBySlug.ts
import { saleorClient } from "../../saleorClient";
import { GET_CATEGORY_BY_SLUG } from "../queries/fetchCategorybySlug";
import type { GetCategoryResponse, Category } from "../types/category";

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { category }: GetCategoryResponse = await saleorClient.request(
      GET_CATEGORY_BY_SLUG,
      { slug }
    );
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
