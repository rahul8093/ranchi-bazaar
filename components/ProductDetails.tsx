"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/app/lib/saleor/types/product";
import { parseSaleorDescription } from "@/app/lib/saleor/helpers/common";
import { useCart } from "@/app/context/CartContext";
import { Loader2Icon } from "lucide-react";
import { BsCartPlus } from "react-icons/bs";
// import { SideBySideMagnifier } from 'react-image-magnifiers'


interface Props {
    product: Product;
}

export default function ProductDetails({ product }: Props) {
    const { addToCart, loadingProductId } = useCart();
    const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
    const [selectedImage, setSelectedImage] = useState(product.media?.[0]?.url || product.thumbnail?.url);


    const handleAddToCart = () => {
        if (selectedVariantId) addToCart(selectedVariantId);
    };

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    const loading = loadingProductId === selectedVariantId;

    // Extracting some known attributes (if available)
    // const attributesMap = Object.fromEntries(
    //     product.attributes?.map((attr: { attribute: { slug: string; }; values: { name: string; }[]; }) => [attr.attribute.slug, attr.values?.[0]?.name || ""]) || []
    // );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image + Thumbnails */}
                <div>
                    <div className="group relative overflow-hidden border w-full h-[600px]">
                        <Image
                            src={selectedImage || "/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>

                    {/* <SideBySideMagnifier
                        imageSrc={selectedImage || "/placeholder.jpg"}
                        largeImageSrc={selectedImage || "/placeholder.jpg"}
                        imageAlt={product.name}
                        className="rounded border react-magnifier "
                        zoomContainerBorder="1px solid #ccc"
                        zoomContainerBoxShadow="0 4px 16px rgba(0, 0, 0, 0.15)"
                        overlayOpacity={0.5}
                        overlayBoxOpacity={0.3}
                        alwaysInPlace={false}
                        fillAvailableSpace={false}
                        switchSides={false}
                        style={{
                            width: "100%",
                            maxWidth: 600,
                        }}
                    /> */}


                    <div className="flex gap-2 mt-4">
                        {product.media?.map((img, i) => (
                            <button key={i} onClick={() => setSelectedImage(img.url)} className="focus:outline-none">
                                <Image
                                    src={img.url}
                                    alt={`Thumbnail ${i}`}
                                    width={80}
                                    height={80}
                                    className={`border p-1 hover:ring ${selectedImage === img.url ? "ring-2 ring-green-600" : ""
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                </div>
                {/* Product Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    {selectedVariant?.pricing?.price?.gross && (
                        <p className="text-2xl font-semibold text-gray-800">
                            {selectedVariant.pricing.price.gross.amount}{" "}
                            {selectedVariant.pricing.price.gross.currency}
                        </p>
                    )}

                    {/* Variant selection */}
                    {/* Variant selection as buttons */}
                    {product.variants.length > 1 && (
                        <div className="grid grid-cols-4 md:flex gap-3 mt-2">
                            {product.variants.map((variant) => {
                                const price = variant.pricing?.price?.gross;
                                // const undiscounted = price?.amount + 10
                                const isActive = variant.id === selectedVariantId;

                                return (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariantId(variant.id)}
                                        className={`border px-4 py-2 rounded-md text-left w-fit ${isActive ? "bg-green-100 border-green-600" : "hover:bg-gray-100"}`}
                                    >
                                        <div className="text-sm font-medium">{variant.name}</div>
                                        <div className="text-sm">
                                            {price?.amount}
                                            {price?.currency}
                                            {/* {undiscounted && price?.amount !== undiscounted && (
                            <span className="text-gray-500 ml-2 line-through">₹{undiscounted}</span>
                        )} */}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}


                    {/* Add to Cart */}
                    <button
                        className={`${loading ? 'animate-plus' : ''} items-center flex justify-center w-full md:w-80 bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 mb-6`}
                        onClick={handleAddToCart}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <>
                                <BsCartPlus className="mr-2" />
                                Add to Cart
                            </>
                        )}

                    </button>

                    {/* <hr className="my-6" /> */}

                    {/* Product Details */}
                    <div className="space-y-4 text-sm text-gray-700 border-t pt-4">
                        {/* <div>
        <h3 className="font-semibold">Flavour</h3>
        <p>{attributesMap["flavour"] || "N/A"}</p>
    </div> */}

                        <div>
                            <h3 className="font-semibold">SKU ID</h3>
                            <p>{selectedVariantId || product?.id}</p> {/* Static for now */}
                        </div>

                        <div>
                            <h3 className="font-semibold">Key Features</h3>
                            <ul className="list-disc list-inside">
                                <li>{product?.name}</li>
                                <li>{product?.variants[0]?.name}</li>
                            </ul>
                        </div>

                        {/* <div>
        <h3 className="font-semibold">Type</h3>
        <p>{attributesMap["type"] || "Soft Drink"}</p>
    </div>

    <div>
        <h3 className="font-semibold">Shelf Life</h3>
        <p>{attributesMap["shelf-life"] || "6 months"}</p>
    </div> */}

                        <div>
                            <h3 className="font-semibold">Return Policy</h3>
                            <p>
                                This Item is non-returnable. For a damaged, defective, incorrect or expired item, you can request a replacement within 72 hours of delivery.
                                In case of an incorrect item, you may raise a replacement or return request only if the item is sealed/ unopened/ unused and in original condition
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Description</h3>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: parseSaleorDescription(product.description) }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-4 w-full md:w-1/2 text-sm text-gray-700">
                <div>
                    <h3 className="font-semibold">Disclaimer</h3>
                    <div className="prose max-w-none">
                        Every effort is made to maintain the accuracy of all information.
                        However, actual product packaging and materials may contain more and/or different information.
                        It is recommended not to solely rely on the information presented.
                    </div>
                </div>
            </div>
        </>
    );
}
