import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/app/lib/saleor/helpers/fetchProductBySlug";
import type { Metadata } from "next";
import ProductDetails from "@/components/ProductDetails";
import type { Product } from "@/app/lib/saleor/types/product";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;  // params is a Promise here
}

// Await params in generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // await here
  const product: Product | null = await fetchProductBySlug(resolvedParams.slug);

  return {
    title: product ? `${product.name} | Product` : "Product",
  };
}

// Await params in the page component
export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params; // await here
  const product: Product | null = await fetchProductBySlug(resolvedParams.slug);
  if (!product) return notFound();

  return (
    <main className="max-w-6xl mx-auto p-8">
      <ProductDetails product={product} />
    </main>
  );
}
