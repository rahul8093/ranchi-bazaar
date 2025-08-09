'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { parseSaleorDescription } from '@/app/lib/saleor/helpers/common';

// type Slide = {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   link: string;
// };

interface Product {
    id: string;
    name: string;
    description: string;
    pricing: { priceRange:{start:{gross:{amount:number}}} };
    thumbnail: { url: string; alt: string };
  }
  
  interface HeroBannerCarouselProps {
    products: Product[];
  }

const HeroBannerCarousel = ({ products }: HeroBannerCarouselProps) => {
  const [current, setCurrent] = useState<number>(0);
  const totalSlides = products.length;
  console.log(products)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // return (
    
  //   <section className=" relative w-full h-[500px] overflow-hidden theme-gradient hero-banner">
      
  //     {products.map((slide, index) => (
  //       <div
  //         key={slide.id}
  //         className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
  //           index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
  //         }`}
  //       >
  //         <Image
  //           src={slide.thumbnail.url}
  //           alt={slide.thumbnail.alt}
  //           fill
  //           className="object-cover brightness-75"
  //           priority={index === 0}
  //         />
  //         <div className=" hero-product-description absolute inset-0 flex flex-col justify-center item-left text-center text-blue px-4">
  //           <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.name}</h2>
  //           <p className="text-lg md:text-xl mb-6">{parseSaleorDescription(slide.description) }</p>
  //           <Link
  //             href={slide.id}
  //             className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200"
  //           >
  //             Shop Now
  //           </Link>
  //         </div>
  //       </div>
  //     ))}

  //     {/* Arrows */}
  //     <button
  //       onClick={prevSlide}
  //       className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
  //       aria-label="Previous Slide"
  //     >
  //       ‹
  //     </button>
  //     <button
  //       onClick={nextSlide}
  //       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
  //       aria-label="Next Slide"
  //     >
  //       ›
  //     </button>

  //     {/* Dots */}
  //     <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
  //       {products.map((_, i) => (
  //         <button
  //           key={i}
  //           onClick={() => setCurrent(i)}
  //           className={`w-3 h-3 rounded-full ${
  //             i === current ? 'bg-white' : 'bg-white/50'
  //           }`}
  //           aria-label={`Go to slide ${i + 1}`}
  //         />
  //       ))}
  //     </div>
      
  //   </section>
  
  // );

    return (
    <section className="relative w-full max-w-[1200px] mx-auto h-[300px] md:h-[400px] lg:h-[500px] bg-[#1c2340] rounded-2xl overflow-hidden shadow-lg">
      {products.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="flex h-full w-full items-center px-6 md:px-16 gap-8">
            {/* Left Text Section */}
            <div className="flex-1 text-white">
              <p className="text-sm uppercase opacity-75 mb-2">
                {parseSaleorDescription(slide.description)}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.name || 'SMART WEARABLE.'}
              </h2>
              <p className="text-xl md:text-2xl mb-6">
                UP to 80% OFF
              </p>
              <Link
                href={slide.id}
                className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 inline-block"
              >
                Shop Now
              </Link>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 relative h-[250px] md:h-[350px]">
              <Image
                src={slide.thumbnail.url}
                alt={slide.thumbnail.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-black z-20"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-black z-20"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-6 flex gap-2 z-20">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBannerCarousel;
