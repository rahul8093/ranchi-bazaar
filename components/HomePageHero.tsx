'use client';

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

import Image from 'next/image';
import { Product } from '@/app/lib/saleor/queries/fetchProducts';
import { parseSaleorDescription } from '@/app/lib/saleor/helpers/common';
import { Card, CardContent } from "./ui/card";
import { useMediaQuery } from '@react-hook/media-query'
import Link from "next/link";
import { RippleWithHoverButton } from "./ui/RippleWithHoverButton";

interface HomepageHeroProps {
    products: Product[];
}


export default function HomepageHero({ products }: HomepageHeroProps) {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const isMobile = useMediaQuery('only screen and (max-width: 768px)');


    // Setup the carousel API
    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", handleSelect);

        return () => {
            api.off("select", handleSelect);
        };
    }, [api]);

    const paginationDots = () => {
        return (
            <div className="absolute bottom-4 left-[38%] md:left-1/2 flex gap-2 z-20">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === current ? 'bg-white' : 'bg-white/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        );
    };


    return (
        <div className="relative w-full">
            <Carousel setApi={setApi} className="w-full relative">
                <CarouselContent className="flex">
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="h-auto">
                            <div className="h-full p-1 md:mx-6">
                                <Card className="h-full flex flex-col p-0">
                                    <CardContent className="p-0 h-full flex">
                                        <div className="flex w-full md:flex-row justify-around flex-col-reverse  h-full bg-[#1c2340] relative rounded-2xl shadow-md items-stretch px-6 md:px-12 text-white">

                                            {/* Left Text Section */}
                                            <div className="w-full md:w-1/2 py-10 space-y-4">
                                                <p className="uppercase text-sm opacity-80">
                                                    {parseSaleorDescription(product.description)}
                                                </p>
                                                <h2 className="text-4xl md:text-5xl font-bold relative z-10">{product.name}</h2>
                                                <p className="text-xl font-medium">
                                                    {product.pricing.priceRange.start.gross.amount}$
                                                </p>

                                                <div className="block">
                                                    <Link  href={`/product/${product?.slug}`}>
                                                        <RippleWithHoverButton
                                                            className="mt-4 overflow-hidden bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
                                                            hoverEffect={{
                                                                scale: 1.03,
                                                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        >
                                                            Shop Now
                                                        </RippleWithHoverButton>
                                                    </Link>
                                                    {isMobile && (<Image
                                                        src={product.thumbnail.url}
                                                        alt={product.thumbnail.alt}
                                                        width={200}
                                                        height={200}
                                                        className=" object-cover text-transparent inline-block absolute bottom-[0%] right-[-5%]"
                                                    />)}

                                                </div>
                                            </div>

                                            {/* Right Image Section */}
                                            {!isMobile && (<div className="h-[30%] md:h-auto md:w-1/2 flex justify-center md:justify-end">
                                                <Image
                                                    src={product.thumbnail.url}
                                                    alt={product.thumbnail.alt}
                                                    width={300}
                                                    height={300}
                                                    className="object-cover"
                                                />
                                            </div>)}

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>


                {/* Navigation Buttons */}
                {paginationDots()}
                <CarouselPrevious className="hidden md:flex absolute left-2 size-12" />
                <CarouselNext className="hidden md:flex absolute right-2 size-12" />
            </Carousel>
        </div>
    );
}