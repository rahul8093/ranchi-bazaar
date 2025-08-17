import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchCategoryBySlug } from "@/app/lib/saleor/helpers/fetchCategorybySlug";
import { fetchProductsByCategoryId } from "@/app/lib/saleor/helpers/getCategoryProducts";
import Image from "next/image";

interface Props {
    params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
    return {
        title: `${params.slug} | Category`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const category = await fetchCategoryBySlug(params.slug);
    if (!category) return notFound();

    const products = await fetchProductsByCategoryId(category.id);

    console.log(products)

    return (
        <main className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold">{category.name}</h1>
            {category.description && <p className="text-gray-600">{category.description}</p>}

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        {product.thumbnail && (
                            <Image src={product.thumbnail.url} alt={product.name} width={120} height={120} className="w-full h-40 object-cover mb-2" />
                        )}
                        <h2 className="font-semibold">{product.name}</h2>
                        {product.pricing?.priceRange?.start?.gross && (
                            <p className="text-sm text-gray-700">
                                {product.pricing.priceRange.start.gross.amount}{" "}
                                {product.pricing.priceRange.start.gross.currency}
                            </p>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}
