'use client';

// import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { IoIosArrowRoundBack } from "react-icons/io";
// import { Button } from '@/components/ui/button';
import { CircleMinus, CirclePlus, Loader2Icon, Trash2 } from 'lucide-react';
// import { useState } from 'react';
import MobileCartSummaryBar from '@/components/MobileCartSummaryBar';

export default function CartPage() {
  const {
    cartItems,
    updateCartItem,
    removeCartItem,
    loadingProductId,
    totalPrice,
    cartCount,
  } = useCart();

  // Optional mock values for summary
  // const estimatedTax = 220.74;
  // const delivery = 'FREE';
  // const discount = 1450.0;
  // const orderTotal = totalPrice + estimatedTax;
  // const [isOpen, setIsOpen] = useState(false);

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-green-600 flex items-center hover:underline"><IoIosArrowRoundBack />Continue shopping</Link>
      </div>
    );
  }

  return (
    <><h2 className="text-2xl max-w-7xl mx-auto px-4 font-bold">Shopping Cart</h2><div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Product Items */}
      <div className="md:col-span-2 space-y-6">

        {cartItems.map((item) => {
          const product = item.variant.product;
          const image = product.thumbnail?.url;
          const loading = loadingProductId === item.id;

          return (
            <div key={item.id} className="flex gap-4 border rounded-md p-4 shadow hover:border-green-500">
              {image && (
                <div className="w-24 h-24 relative">
                  <Image
                    src={image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>

              )}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500"><span>Varient: </span>{item.variant.name}</p>
                  <p className="text-sm text-gray-500"><span>SKU: </span>{item.variant.id}</p>
                  <p className="text-sm text-gray-500"><span>Quantity: </span>{item.quantity}</p>
                </div>
                <div className="flex items-center justify-between mt-2">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateCartItem(item.id, item.quantity - 1)
                        }
                        className="py-1 rounded hover:scale-110"
                        aria-label="Decrease quantity"
                        disabled={item.quantity === 1 || loading}
                      >
                        <CircleMinus size={20} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartItem(item.id, item.quantity + 1)
                        }
                        className=" py-1 rounded hover:scale-110"
                        aria-label="Increase quantity"
                        disabled={loading}
                      >
                        <CirclePlus size={20} />

                      </button>
                      {loading && <Loader2Icon className="animate-spin" />}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      ${(item?.variant?.pricing?.price?.gross?.amount).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Cart Summary */}
      <div className="border rounded-md p-6 bg-white shadow-sm h-fit">
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

        <button
          className="w-full bg-green-600 font-medium hover:bg-green-700 text-white py-2 rounded py-3 mt-6 flex items-center justify-center gap-2"
        >
          Go to Checkout
        </button>
      </div>
    </div>

      {/* Fixed Bottom Toggle Bar */}
      {/* <div className="fixed gap-6 bottom-0 rounded-sm shadow inset-x-0 bg-white border-t flex justify-between items-center px-4 py-2 sm:hidden z-40">
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
      </div> */}
      <MobileCartSummaryBar />
    </>
  );
}
