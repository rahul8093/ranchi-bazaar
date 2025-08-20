'use client';

import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

export default function MobileSummaryBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [startY, setStartY] = useState<number | null>(null);

    const {
        totalPrice,
        cartCount,
    } = useCart();

    const onClose = () => {
        setIsOpen(false)
    }



    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        if (startY !== null && endY - startY > 50) {
            // User swiped down
            onClose();
        }
    };

    return (
        <>
            {/* Slide-up Summary */}
            <div
                className={`fixed inset-0 bottom-0 z-30 bg-black/30 border-t shadow-lg sm:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'} `}
                onClick={onClose}
            >
                <div className={`border border-green-500 rounded-md p-6 bg-white shadow-sm h-fit pb-16 absolute bottom-0 w-full 
                    transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>

                    <div className="space-y-2 text-sm text-gray-700">
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
            </div>

            {/* Fixed Bottom Toggle Bar */}
            <div className="fixed gap-6 bottom-0 rounded-sm shadow inset-x-0 bg-white border-t flex justify-between items-center px-4 py-2 sm:hidden z-40">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white border w-1/2 px-4 py-2 rounded font-medium flex items-center justify-center"
                >
                    Checkout
                </button>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-1/2 border border-gray-400 px-4 py-2 rounded font-medium flex items-center justify-center hover:bg-green-50"
                >
                    Summary {isOpen ? '▴' : '▾'}
                </button>
            </div>
        </>
    );
}
