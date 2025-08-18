// app/api/category-products/route.ts
import { NextResponse } from "next/server";
import { fetchProductsByCategoryId } from "@/app/lib/saleor/helpers/getCategoryProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const after = searchParams.get("after") ?? undefined;

  if (!categoryId) {
    return NextResponse.json({ error: "Missing categoryId" }, { status: 400 });
  }

  const data = await fetchProductsByCategoryId(categoryId, after);

  return NextResponse.json(data);
}
