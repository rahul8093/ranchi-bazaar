
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts, Product } from '../lib/saleor/queries/fetchProducts';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SkeletonCardGroup } from '@/components/SkeletorCard';
import HomepageHero from '@/components/HomePageHero';
import { Rabbit } from 'lucide-react';
import { FaApple } from "react-icons/fa";
import { SiXiaomi } from "react-icons/si";
import { AiFillTrademarkCircle } from "react-icons/ai";


const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProducts();
        setProducts(result);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const { addToCart, loadingProductId, cartItems, updateCartItem } = useCart();
  const brands = [
    { brand: 'Apple', bg: 'bg-white', img: FaApple },
    { brand: 'Realme', bg: 'bg-yellow-100', img: SiXiaomi },
    { brand: 'Xiaomi', bg: 'bg-orange-100', img: SiXiaomi },
  ];

  if (loading) {
    return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
        <SkeletonCardGroup count={6} />

      </div>)
  }

  return (
    <div className="w-full">
      <HomepageHero products={products} />
      <section className="md:container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Grab the best deal on <span className="text-green-600">Smartphones</span>
          </h2>
          <Link href="/smartphones" className="text-sm text-gray-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4">
          {products?.map((product) => {
            const oldPrice = product.pricing.priceRange.start.gross.amount + 10000;
            const newPrice = product.pricing.priceRange.start.gross.amount;
            const discountPercent = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
            const saveAmount = oldPrice - newPrice;
            const cartItem = cartItems.find(item => item.variant.id === product?.variants[0].id);
            const quantity = cartItem?.quantity ?? 0;
            const loading =
              loadingProductId === product.variants[0].id ||
              loadingProductId === cartItem?.id;


            return (
              <div
                key={product.id}
                className={`${loading ? 'animate-pulse' : ""} min-w-[160px] border p-3 rounded-2xl shadow-md hover:shadow-md relative flex flex-col justify-between`}
              >
                {/* Discount badge */}
                <div className="absolute shadow-sm rounded-lg top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded z-10">
                  {discountPercent}% OFF
                </div>



                {/* Image */}
                <div className="relative w-full h-44 mb-2 bg-gray-100 rounded-2xl shadow-sm">
                  <Image
                    src={product.thumbnail.url}
                    alt={product.thumbnail.alt || product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-sm font-medium text-black md:w-36">{product.name}</h3>

                {/* Prices */}
                <p className="text-xs line-through text-gray-400">₹{oldPrice}</p>
                <p className="text-green-600 font-semibold text-sm">₹{newPrice}</p>
                <p className="text-xs text-green-500 mb-2">Save ₹{saveAmount}</p>

                {/* Button */}

                <div >
                  <div className="mt-auto">
                    {loading ? (
                      <Button size="sm" disabled
                        className=' w-full border border-green-500 text-green-700 text-sm py-1 rounded bg-white cursor-not-allowed'>
                        <Loader2Icon className="animate-spin" />
                        Please wait
                      </Button>
                    ) : quantity > 0 ? (
                      <div className="flex items-center justify-between border border-green-500 rounded ">
                        <button
                          onClick={() => {
                            if (cartItem) {
                              updateCartItem(cartItem.id, cartItem.quantity - 1);
                            }
                          }}

                          className="w-10 text-green-700 py-1 hover:bg-green-50"
                        >
                          –
                        </button>
                        <span className="text-green-700">{quantity}</span>
                        <button
                          onClick={() => {
                            if (cartItem) {
                              updateCartItem(cartItem.id, cartItem.quantity + 1);
                            }
                          }}
                          className="w-10 text-green-700 py-1 hover:bg-green-50"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.variants[0].id)}
                        className=" w-full border border-green-500 text-green-700 py-1 rounded bg-white hover:bg-green-50"
                      >
                        ADD
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>


      {/*  Top Categories */}
      <section className="md:container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Shop from <span className="text-green-600">Top Categories</span>
          </h2>
          <Link href="/categories" className="text-sm text-gray-600">View All →</Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 text-center">
          {[
            'Mobile',
            'Cosmetics',
            'Electronics',
            'Furniture',
            'Watches',
            'Decor',
            'Accessories',
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 shadow-md flex items-center justify-center mb-2">
                <AiFillTrademarkCircle />
              </div>
              <span className="text-xs">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/*  Brand Carousel */}
      <section className="md:container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Top Electronics <span className="text-green-600">Brands</span>
          </h2>
          <Link href="/brands" className="text-sm text-gray-600">View All →</Link>
        </div>

        <div className="flex overflow-x-auto gap-4 scrollbar-hide p-4">
          {brands.map((item, i) => {
            const Icon = item.img; // Assign the icon component
            return (
              <div
                key={i}
                className={`min-w-[250px] rounded-xl p-4 shadow-md flex items-center gap-4 ${item.bg}`}
              >
                <Icon className="text-3xl text-black" />
                <div className="text-lg font-bold text-black">{item.brand}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/*  Daily Essentials */}
      <section className="md:container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Daily <span className="text-green-600">Essentials</span>
          </h2>
          <Link href="/essentials" className="text-sm text-gray-600">View All →</Link>
        </div>

        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {[
            'Daily Essentials',
            'Vegetables',
            'Fruits',
            'Strawberry',
            'Mango',
            'Cherry',
          ].map((item, i) => (
            <div
              key={i}
              className="min-w-[100px] text-center bg-white border p-2 rounded shadow hover:shadow-md"
            >
              {/* <Image
                src={`/essentials/${item.toLowerCase().replace(' ', '-')}.png`}
                alt={item}
                width={80}
                height={80}
                className="mx-auto mb-1"
              /> */}
              <Rabbit />
              <p className="text-xs font-medium">{item}</p>
              <p className="text-[10px] text-green-600">UP to 50% OFF</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;