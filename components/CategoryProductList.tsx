// components/CategoryProductList.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SkeletonCardGroup } from "./SkeletorCard";
import { Button } from "./ui/button";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    slug: string;
    thumbnail?: { url: string };
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

interface Props {
    categoryId: string;
}

export function CategoryProductList({ categoryId }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [after, setAfter] = useState<string | undefined>(undefined);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async (cursor?: string) => {
        setLoading(true);
        const res = await fetch(
            `/api/category-products?categoryId=${categoryId}${cursor ? `&after=${cursor}` : ""}`
        );
        const data = await res.json();
        console.log(data)

        setProducts((prev) => [...prev, ...data.products]);
        setHasNextPage(data.hasNextPage);
        setAfter(data.endCursor);
        setLoading(false);
    }, [categoryId]);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLoadMore = () => {
  if (hasNextPage) {
    fetchProducts(after); 
  }
};
    return (
        <>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                    <Link href={`/product/${product?.slug}`} key={product.id}>
                         <div key={product.id} className="border p-4 rounded bg-white">
                        {product.thumbnail?.url && (
                            <Image
                                src={product.thumbnail.url}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="w-full h-40 object-cover mb-2"
                            />
                        )}
                        <h2 className="font-semibold">{product.name}</h2>
                        {product.pricing?.priceRange?.start?.gross && (
                            <p className="text-sm text-gray-700">
                                {product.pricing.priceRange.start.gross.amount}{" "}
                                {product.pricing.priceRange.start.gross.currency}
                            </p>
                        )}
                    </div>
                    </Link>                 
                ))}
                {loading && (<SkeletonCardGroup count={5} />)}
            </section>

            {hasNextPage && (
                <><div className="text-center mt-6">
                    <Button
                        onClick={handleLoadMore}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        Load More
                    </Button>
                </div>
                </>
            )}
        </>
    );
}
