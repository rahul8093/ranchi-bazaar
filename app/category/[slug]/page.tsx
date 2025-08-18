import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryProductList } from "@/components/CategoryProductList";
import { fetchCategoryBySlug } from "@/app/lib/saleor/helpers/fetchCategorybySlug";


export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    const category = await fetchCategoryBySlug(slug);

    return {
        title: category ? `${category.name} | Category` : "Category",
    };
}


export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const category = await fetchCategoryBySlug(slug);
    if (!category) return notFound();

    return (
        <main className="p-6 max-w-7xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold">{category.name}</h1>
            {category.description && <p className="text-gray-600">{category.description}</p>}
            <CategoryProductList categoryId={category.id} />
        </main>
    );
}