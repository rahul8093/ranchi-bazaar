"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SkeletonCardGroup } from "./SkeletorCard";
import { Button } from "./ui/button";
import { CircleMinus, CirclePlus, Loader2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

interface Product {
    id: string;
    name: string;
    slug: string;
    variants: { id: string }[];
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

    // Use your Cart Context
    const {
        addToCart,
        loadingProductId,
        cartItems,
        updateCartItem,
        removeCartItem,
        // cartLoading,
    } = useCart();

    const fetchProducts = useCallback(
        async (cursor?: string) => {
            setLoading(true);
            const res = await fetch(
                `/api/category-products?categoryId=${categoryId}${cursor ? `&after=${cursor}` : ""
                }`
            );
            const data = await res.json();

            setProducts((prev) => {
                const combined = [...prev, ...data.products];
                const uniqueProducts = Array.from(
                    new Map(combined.map((p) => [p.id, p])).values()
                );
                return uniqueProducts;
            });
            setHasNextPage(data.hasNextPage);
            setAfter(data.endCursor);
            setLoading(false);
        },
        [categoryId]
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLoadMore = () => {
        if (hasNextPage) {
            fetchProducts(after);
        }
    };
    console.log(products)
    // Find cart item by variantId
    const getCartItem = (variantId: string) =>
        cartItems.find((item) => item.variant?.id === variantId);



    return (
        <>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {products.map((product) => {
                    const hasMultipleVariants = product?.variants.length > 1;
                    const variantId = product.variants[0]?.id;
                    const cartItem = getCartItem(variantId);
                    const qty = cartItem?.quantity || 0;
                    const isLoading =
                        loadingProductId === variantId ||
                        loadingProductId === cartItem?.id;



                    const handleIncrease = async () => {
                        if (qty === 0) {
                            await addToCart(variantId, 1);
                        } else {
                            await updateCartItem(cartItem!.id, qty + 1);
                        }
                    };

                    const handleDecrease = async () => {
                        if (qty === 1) {
                            await removeCartItem(cartItem!.id);
                        } else {
                            await updateCartItem(cartItem!.id, qty - 1);
                        }
                    };

                    return (
                        <div
                            key={product.id}
                            className="border rounded-x1 bg-white shadow-sm hover:shadow-md p-4 flex flex-col transition-shadow duration-200"
                        >
                            {/* Clickable image + name */}
                            <Link href={`/product/${product.slug}`} className="cursor-pointer">
                                <div className="relative w-full h-44 mb-4 overflow-hidden bg-gray-50 rounded-lg ">
                                    {product.thumbnail?.url && (
                                        <Image
                                            src={product.thumbnail.url}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                            priority={false}
                                        />
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                                    {product.name}
                                </h3>
                            </Link>

                            {product.pricing?.priceRange?.start?.gross && (
                                <p className="text-sm text-green-700 mb-4">
                                    {product.pricing.priceRange.start.gross.amount.toFixed(2)}{" "}
                                    {product.pricing.priceRange.start.gross.currency}
                                </p>
                            )}

                            {/* Quantity controls */}
                            {/* <div className="mt-auto flex items-center space-x-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleDecrease}
                                    disabled={qty === 0 || isLoading || cartLoading}
                                    aria-label="Decrease quantity"
                                    className="p-1 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <CircleMinus size={16} />
                                    )}
                                </Button>

                                <span className="text-gray-800 font-medium min-w-[24px] text-center">
                                    {qty}
                                </span>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleIncrease}
                                    disabled={isLoading || cartLoading}
                                    aria-label="Increase quantity"
                                    className="p-1 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <CirclePlus size={16} />
                                    )}
                                </Button>
                            </div> */}
                            {/* {hasMultipleVariants ? (
                                <Link href={`/product/${product.slug}`}>
                                    <Button className="w-full mt-auto">View Product</Button>
                                </Link>
                            ) : (
                                <div className="mt-auto flex items-center space-x-3">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleDecrease}
                                        disabled={qty === 0 || isLoading || cartLoading}
                                        aria-label="Decrease quantity"
                                        className="p-1 flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" size={16} />
                                        ) : (
                                            <CircleMinus size={16} />
                                        )}
                                    </Button>

                                    <span className="text-gray-800 font-medium min-w-[24px] text-center">
                                        {qty}
                                    </span>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleIncrease}
                                        disabled={isLoading || cartLoading}
                                        aria-label="Increase quantity"
                                        className="p-1 flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" size={16} />
                                        ) : (
                                            <CirclePlus size={16} />
                                        )}
                                    </Button>
                                </div>
                            )} */}
                            {hasMultipleVariants ? (
                                <Link href={`/product/${product.slug}`}>
                                    <Button className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700 ">View Product</Button>
                                </Link>
                            ) : qty === 0 ? (
                                <Button
                                    onClick={() => handleIncrease()}
                                    disabled={isLoading}
                                    className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Add"}
                                </Button>
                            ) : (
                                <div className="mt-auto flex items-center space-x-3">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleDecrease}
                                        disabled={isLoading}
                                        aria-label="Decrease quantity"
                                        className="p-1 flex items-center justify-center text-green-600 hover:text-green-700"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : <CircleMinus size={16} />}
                                    </Button>

                                    <span className="text-gray-800 font-medium min-w-[24px] text-center">
                                        {qty}
                                    </span>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleIncrease}
                                        disabled={isLoading}
                                        aria-label="Increase quantity"
                                        className="p-1 flex items-center justify-center text-white text-green-600 hover:text-green-700"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : <CirclePlus size={16} />}
                                    </Button>
                                </div>
                            )}


                        </div>
                    );
                })}
                {loading && <SkeletonCardGroup count={5} />}
            </section>

            {hasNextPage && (
                <div className="text-center mt-8">
                    <Button
                        onClick={handleLoadMore}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
}
