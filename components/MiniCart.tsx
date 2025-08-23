'use client';

import React from 'react';
import Image from 'next/image';
import { CheckoutLine } from '@/app/lib/saleor/queries/fetchCheckout';
import { Loader2Icon, Trash2, CircleMinus, CirclePlus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

type MiniCartProps = {
    isOpen: boolean;
    onClose: () => void;
    items: CheckoutLine[];
    total: number;
    updateCartItem: (lineId: string, quantity: number) => void;
    removeCartItem: (lineId: string) => void;
    loadingProductId: string | null;
    cartCount: number;
};

export default function MiniCart({
    isOpen,
    onClose,
    items,
    total,
    updateCartItem,
    removeCartItem,
    loadingProductId,
}: MiniCartProps) {
    const router = useRouter()
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetTrigger asChild>{/* External button triggers this */}</SheetTrigger>
            <SheetContent side="right" className="bg-white text-neutral-900 w-3/4">
                <SheetHeader>
                    <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
                </SheetHeader>

                <ScrollArea className="h-[calc(100%-180px)] p-4">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        items.map((item) => {
                            const price =
                                (item.variant?.pricing?.price?.gross?.amount ?? 0) * item.quantity;
                            const loading =
                                loadingProductId === item?.id ||
                                loadingProductId === item?.variant.id;

                            return (
                                <div
                                    key={item.id}
                                    className={`${loading ? 'opacity-50' : ''
                                        } flex flex-col sm:flex-row gap-3 items-start p-3 bg-accent rounded-lg border border-gray-200 shadow-sm mb-4`}
                                >
                                    <Image
                                        src={item?.variant?.product?.thumbnail?.url || ''}
                                        alt={item?.variant?.product?.thumbnail?.alt || 'Product Image'}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover shrink-0"
                                    />

                                    <div className="flex flex-col flex-grow w-full">
                                        <div className="flex justify-between gap-2 items-start">
                                            <p className="font-medium text-sm leading-tight flex-1">
                                                {item?.variant?.product?.name}
                                            </p>
                                            <p className="text-sm font-semibold whitespace-nowrap">${price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        item.quantity > 1 && updateCartItem(item.id, item.quantity - 1)
                                                    }
                                                    aria-label="Decrease quantity"
                                                    disabled={item.quantity === 1 || loading}
                                                    className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                                                >
                                                    <CircleMinus className="w-4 h-4" />
                                                </button>
                                                <span className="text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                    disabled={loading}
                                                    className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                                                >
                                                    <CirclePlus className="w-4 h-4" />
                                                </button>
                                                {loading && <Loader2Icon className="w-4 h-4 animate-spin text-gray-500 ml-1" />}
                                            </div>

                                            <button
                                                onClick={() => removeCartItem(item.id)}
                                                aria-label="Remove item"
                                                disabled={loading}
                                                className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="flex flex-col gap-4 p-4 border-t border-gray-200 bg-white sticky bottom-0">
                        <div className="w-full flex justify-between text-base font-semibold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full rounded-full bg-green-600 text-white hover:bg-green-700"
                            onClick={() => {
                                router.push('/cart')
                                onClose()
                            }}
                        >
                            Go to Cart
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
