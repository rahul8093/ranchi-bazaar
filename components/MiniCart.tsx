'use client';

import React from 'react';
import Image from 'next/image';
import { CheckoutLine } from '@/app/lib/saleor/queries/fetchCheckout';
import { Loader2Icon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Trash2,CircleMinus,CirclePlus } from 'lucide-react';


type MiniCartProps = {
    isOpen: boolean;
    onClose: () => void;
    items: CheckoutLine[];
    total: number;
    updateCartItem: (lineId: string, quantity: number) => void;
    removeCartItem: (lineId: string) => void;
    loadingProductId: string | null
};

const MiniCart: React.FC<MiniCartProps> = ({
    isOpen,
    onClose,
    items,
    total,
    updateCartItem,
    removeCartItem,
    loadingProductId
}) => {

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />}


            {/* MiniCart Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 transition-transform duration-300 shadow-lg z-50 theme-gradient text-white
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                <div className="p-4 flex justify-between items-center border-b border-white/40">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={onClose} className="text-xl">
                        &times;
                    </button>
                </div>
                <ScrollArea className="flex-grow h-[calc(100%-200px)]">
                    <div className="p-4 space-y-4 flex flex-col flex-grow overflow-auto">
                        {items.length === 0 ? (
                            <p className="text-center text-white/70 mt-10">Your cart is empty.</p>
                        ) : (
                            items.map((item) => {
                                const price = (item.variant?.pricing?.price?.gross?.amount ?? 0) * item.quantity;
                                const loading =
                                    loadingProductId === item?.id ||
                                    loadingProductId === item?.variant.id
                                return (
                                    <div key={item.id} className={`${loading?'animate-pulse':''} border-b border-white/20 py-2`} >
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-medium">{item?.variant?.product?.name}</p>
                                            <Image
                                                src={item?.variant?.product?.thumbnail?.url || ''}
                                                alt={item?.variant?.product?.thumbnail?.alt || 'product_image'}
                                                width={50}
                                                height={20}
                                                className={`${loading?'animate-bounce':''}`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        item.quantity > 1 &&
                                                        updateCartItem(item.id, item.quantity - 1)
                                                    }
                                                    className="px-2 py-1 rounded hover:scale-110"
                                                    aria-label="Decrease quantity"
                                                    disabled={item.quantity === 1 || loading}
                                                >
                                                    {/* - */}
                                                    <CircleMinus/>
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateCartItem(item.id, item.quantity + 1)
                                                    }
                                                    className="px-2 py-1 rounded hover:scale-110"
                                                    aria-label="Increase quantity"
                                                    disabled={loading}
                                                >
                                                    {/* + */}
                                                    <CirclePlus/>
                                                </button>
                                                {loading && <Loader2Icon className="animate-spin" />}
                                            </div>

                                            <p>${price.toFixed(2)}</p>

                                            <Button
                                                onClick={() => removeCartItem(item.id)}
                                                className="text-white-500 hover:text-accent-foreground font-semibold"
                                                aria-label="Remove item"
                                                disabled={loading}
                                                variant='destructive'
                                            >
                                                <Trash2/>
                                                
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </ScrollArea>


                {items.length > 0 && (
                    <div className="p-4 border-t border-white/40">
                        <p className="font-semibold text-right mb-4">Total: ${total.toFixed(2)}</p>
                        <button
                            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
                            onClick={() => {
                                window.location.href = '/cart';
                            }}
                        >
                            Go to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MiniCart;
