'use client';

import { useCart } from '@/app/context/CartContext';
// import { useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerTrigger,
    DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export default function MobileSummaryBar() {
    const {
        totalPrice,
        cartCount,
    } = useCart();

    return (
        <>
            {/* Fixed Bottom Toggle Bar */}
            <div className="fixed gap-2 bottom-0 rounded-sm shadow inset-x-0 bg-white border-t flex justify-between items-center px-4 py-2 sm:hidden z-40">
                <Button className="w-1/2 bg-green-600 hover:bg-green-700 text-white">
                    Checkout
                </Button>

                {/* DrawerTrigger is the Summary button */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="w-1/2 border-gray-300">
                            Summary ▾
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="sm:max-w-full">
                        <DrawerHeader>
                            <DrawerTitle className="text-xl">Cart Summary</DrawerTitle>
                            <DrawerDescription className="text-sm">
                                Review your order before checking out.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="px-4 space-y-3 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal: ({cartCount} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className='font-medium'>Shipping:</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span className='font-medium'>GST:</span>
                                <span>0</span>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Order Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="text-green-600 text-sm font-medium mt-1">
                                You Save: $20
                            </div>
                        </div>

                        <DrawerFooter>
                            <Button className="w-full bg-green-600">Proceed to Checkout</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full border-gray-300">
                                    Close
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
