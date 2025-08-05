// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['store-b2elkwry.saleor.cloud'], // Add the domain hosting your images here
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

// Parse the hostname from the NEXT_PUBLIC_API_URI
const apiUrl = process.env.NEXT_PUBLIC_API_URI || "";
let imageDomain: string | null = null;

try {
  const url = new URL(apiUrl);
  imageDomain = url.hostname;
} catch (error) {
  console.warn("⚠️ Invalid NEXT_PUBLIC_API_URI, skipping image domain:", apiUrl);
}

const nextConfig: NextConfig = {
  images: {
    domains: imageDomain ? [imageDomain] : [],
  },
};

export default nextConfig;
