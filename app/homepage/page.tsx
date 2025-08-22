
'use client';

import Link from 'next/link';
import { fetchProducts, Product } from '../lib/saleor/queries/fetchProducts';
import { useEffect, useState } from 'react';
import { HomePageSkeleton } from '@/components/SkeletorCard';
import HomepageHero from '@/components/HomePageHero';
import { Rabbit } from 'lucide-react';
import { FaApple } from "react-icons/fa";
import { SiXiaomi } from "react-icons/si";
import { AiFillTrademarkCircle } from "react-icons/ai";
import ProductCard from '@/components/product/ProductCard';


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

  const brands = [
    { brand: 'Apple', bg: 'bg-white', img: FaApple },
    { brand: 'Realme', bg: 'bg-yellow-100', img: SiXiaomi },
    { brand: 'Xiaomi', bg: 'bg-orange-100', img: SiXiaomi },
  ];

  if (loading) {
    return (
      <HomePageSkeleton />
    )
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

        {/* product card */}
        <div className="flex overflow-x-auto gap-4 scrollbar-hide p-4 overflow-visible">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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