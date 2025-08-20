'use client';

import { Skeleton } from "@/components/ui/skeleton";
interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export function SkeletonCardSmall({ className }: SkeletonCardProps) {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

interface SkeletonCardGroupProps {
    count?: number;
    className?: string;
}

export function SkeletonCardGroup({ count = 1 }: SkeletonCardGroupProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
}

export function SkeletonCardGroupSmall({ count = 1 }: SkeletonCardGroupProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCardSmall key={i} />
            ))}
        </>
    );
}


export function CartPageSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left Side: Cart Items (2 placeholders) */}
            <div className="md:col-span-2 space-y-6">
                {[1, 2].map((_, i) => (
                    <div key={i} className="flex gap-4 border rounded-md p-4 shadow">
                        <Skeleton className="w-24 h-24 rounded" />

                        <div className="flex flex-col flex-grow justify-between w-full space-y-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-3 w-1/3" />
                                <Skeleton className="h-3 w-1/4" />
                                <Skeleton className="h-3 w-1/4" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center space-x-2">
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                    <Skeleton className="w-4 h-4" />
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Side: Cart Summary */}
            <div className="border rounded-md p-6 bg-white shadow-sm space-y-4 h-fit">
                <Skeleton className="h-6 w-1/2" />

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                </div>

                <hr />

                <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-12" />
                </div>

                <Skeleton className="h-3 w-1/2" />

                <Skeleton className="h-10 w-full rounded-full" />
            </div>
        </div>
    );
}


export function ProductDetailsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4 py-10">
            {/* Image Section */}
            <div>
                <div className="relative w-full h-[300px] md:h-[600px] border overflow-hidden rounded">
                    <Skeleton className="w-full h-full" />
                </div>

                <div className="flex gap-2 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="w-20 h-20 rounded border" />
                    ))}
                </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" /> {/* Product Title */}
                <Skeleton className="h-6 w-32" /> {/* Price */}

                {/* Variant Buttons */}
                <div className="flex flex-wrap gap-3 mt-2">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="w-28 h-12 rounded-md" />
                    ))}
                </div>

                {/* Add to Cart Button */}
                <Skeleton className="h-12 w-full md:w-80 rounded-full" />

                {/* Info Section */}
                <div className="space-y-4 text-sm border-t pt-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-1/3 mb-1" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6 mt-1" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="md:col-span-2 mt-8 text-sm">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}


export function HomePageSkeleton() {
    return (
        <div className="w-full">
            {/* Skeleton Hero */}
            <div className="w-full h-60 md:h-96 bg-gray-100 mb-6">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Smartphones section */}
            <section className="md:container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-60" />
                    <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="min-w-[160px] border rounded-2xl shadow-md p-2"
                        >
                            <Skeleton className="h-32 w-full mb-2 rounded-xl" />
                            <Skeleton className="h-4 w-3/4 mb-1" />
                            <Skeleton className="h-3 w-1/2 mb-1" />
                            <Skeleton className="h-4 w-2/3 mb-1" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-6 w-full mt-2 rounded-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Categories */}
            <section className="md:container mx-auto px-4 py-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <Skeleton className="w-16 h-16 rounded-full mb-2" />
                            <Skeleton className="w-12 h-3" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Brand Carousel */}
            <section className="md:container mx-auto px-4 py-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="flex overflow-x-auto gap-4 scrollbar-hide p-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton
                            key={i}
                            className="min-w-[250px] h-20 rounded-xl"
                        />
                    ))}
                </div>
            </section>

            {/* Essentials */}
            <section className="md:container mx-auto px-4 py-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="min-w-[100px] border p-2 rounded shadow text-center"
                        >
                            <Skeleton className="h-10 w-10 mx-auto mb-1 rounded-full" />
                            <Skeleton className="h-3 w-16 mb-1 mx-auto" />
                            <Skeleton className="h-2 w-14 mx-auto" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
