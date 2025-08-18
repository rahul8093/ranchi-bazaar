import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchCategoryBySlug } from "@/app/lib/saleor/helpers/fetchCategorybySlug";
import { CategoryProductList } from "@/components/CategoryProductList";

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

    return (
        <main className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold">{category.name}</h1>
            {category.description && <p className="text-gray-600">{category.description}</p>}

            <CategoryProductList categoryId={category.id} />
        </main>
    );
}
