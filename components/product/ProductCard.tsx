// product/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/app/lib/saleor/queries/fetchProducts';
import { useCart } from '@/app/context/CartContext';
import { useCartFly } from '@/app/context/CartFlyProvider';
import { useRef } from 'react';

type ProductCardProps = {
    product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart, loadingProductId, cartItems, updateCartItem } = useCart();
    const imageRef = useRef<HTMLDivElement>(null);
    const { flyToCart } = useCartFly();

    const oldPrice = product.pricing.priceRange.start.gross.amount + 10000;
    const newPrice = product.pricing.priceRange.start.gross.amount;
    const discountPercent = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    const saveAmount = oldPrice - newPrice;
    const cartItem = cartItems.find(item => item.variant.id === product?.variants[0].id);
    const quantity = cartItem?.quantity ?? 0;
    const loading =
        loadingProductId === product.variants[0].id ||
        loadingProductId === cartItem?.id;

    const handleAddToCart = () => {
        const from = imageRef.current?.getBoundingClientRect();
        const to = document.querySelector('#cart-icon')?.getBoundingClientRect();

        if (from && to) {
            flyToCart({
                imageUrl: product.thumbnail.url,
                from,
                to,
            });
        }

        addToCart(product.variants[0].id);
    };

    return (
        <div
            className={`${loading ? 'animate-pulse' : ""} hover:border-green-500 min-w-[160px] border rounded-2xl shadow-md hover:shadow-md relative flex flex-col justify-between`}
        >
            {/* Discount badge */}
            <div className="absolute shadow-sm top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded z-10">
                {discountPercent}% OFF
            </div>

            {/* Image */}
            <Link href={`/product/${product.slug}`}>
                <div
                    className="relative w-full h-44 mb-2 bg-gray-100 rounded-2xl shadow-sm"
                    ref={imageRef}
                >
                    <Image
                        src={product.thumbnail.url}
                        alt={product.thumbnail.alt || product.name}
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>

            <div className="px-4 pb-4">
                {/* Name */}
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium text-black md:w-36">{product.name}</h3>
                </Link>

                {/* Prices */}
                <p className="text-xs line-through text-gray-400">₹{oldPrice}</p>
                <p className="text-green-600 font-semibold text-sm">₹{newPrice}</p>
                <p className="text-xs text-green-500 mb-2">Save ₹{saveAmount}</p>
            </div>

            {/* Add to Cart / Quantity */}
            <div>
                <div className="mt-auto text-sm w-16 absolute bottom-[-2%] right-[-6%] bg-white">
                    {loading ? (
                        <Button size="sm" disabled className="w-full border border-green-500 text-green-700 text-sm py-1 rounded bg-white cursor-not-allowed">
                            <Loader2Icon className="animate-spin" />
                        </Button>
                    ) : quantity > 0 ? (
                        <div className="flex items-center justify-between border border-green-500 rounded bg-white">
                            <button
                                onClick={() => cartItem && updateCartItem(cartItem.id, cartItem.quantity - 1)}
                                className="w-10 text-green-700 py-1 hover:bg-green-50 rounded"
                            >
                                –
                            </button>
                            <span className="text-green-700">{quantity}</span>
                            <button
                                onClick={() => cartItem && updateCartItem(cartItem.id, cartItem.quantity + 1)}
                                className="w-10 text-green-700 py-1 hover:bg-green-50 rounded"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full border border-green-500 text-green-700 py-1 rounded bg-white hover:bg-green-50"
                        >
                            ADD
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
