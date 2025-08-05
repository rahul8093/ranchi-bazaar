// 'use client';

// import Link from 'next/link';
// import Image from 'next/image'; // Importing the Image component from Next.js
// import '../styles/homepage.css'; // Import homepage-specific styles
// import HeroBannerCarousel from '@/components/HeroBannerCarousel';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   pricing: { priceRange:{start:{gross:{amount:number}}} };
//   thumbnail: { url: string; alt: string };
// }

// interface HomePageProps {
//   products: Product[];
// }

// const HomePage = ({ products }: HomePageProps) => {
//   return (
//     <div className="homepage">
//             <HeroBannerCarousel products = {products}/>

//       <main>
//         <section className="products">
//           <div className='container'>
//           <h2>Featured Products</h2>
//           <div className="product-list">
//             {products.map((node) => (
//               <div key={node.id} className="product-card">
//                 <Image
//                   src={node.thumbnail.url}
//                   alt={node.thumbnail.alt || node.name}
//                   width={200}
//                   height={200}
//                   className="product-image"
//                   priority
//                 />
//                 <h3>{node.name}</h3>
//                 <p>{node.description}</p>
//                 <p>Price: ${node.pricing.priceRange.start.gross.amount}</p>
//                 <Link href={`/product/${node.id}`} className="view-details">
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//           </div>
//         </section>
//       </main>
  
//     </div>
//   );
// };

// export default HomePage;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import HeroBannerCarousel from '@/components/HeroBannerCarousel';
// import { products } from '@/data/mock';

interface Product {
  id: string;
  name: string;
  description: string;
  pricing: { priceRange:{start:{gross:{amount:number}}} };
  thumbnail: { url: string; alt: string };
}

interface HomePageProps {
  products: Product[];
}

const HomePage = ({ products }: HomePageProps) => {
  return (
    <div className="w-full">
      <HeroBannerCarousel products={products} />

      {/* ✅ Deal Strip */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Grab the best deal on <span className="text-green-600">Smartphones</span>
          </h2>
          <Link href="/smartphones" className="text-sm text-gray-600">View All →</Link>
        </div>

        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[160px] border p-3 rounded shadow hover:shadow-md">
              <div className="relative w-full h-40 mb-2">
                <Image
                  src={product.thumbnail.url}
                  alt={product.thumbnail.alt || product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm line-through text-gray-400">₹24999</p>
              <p className="text-green-600 font-semibold">₹{product.pricing.priceRange.start.gross.amount}</p>
              <p className="text-xs text-green-500">Save ₹{4500}</p>
              <button className="mt-2 w-full bg-green-100 text-green-700 text-sm py-1 rounded border border-green-500 hover:bg-green-200">
                ADD
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Top Categories */}
      <section className="container mx-auto px-4 py-6">
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
                <Image
                  src={`/icons/${cat.toLowerCase()}.png`} // example image path
                  alt={cat}
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-xs">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Brand Carousel */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Top Electronics <span className="text-green-600">Brands</span>
          </h2>
          <Link href="/brands" className="text-sm text-gray-600">View All →</Link>
        </div>

        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {[
            { brand: 'Apple', bg: 'bg-gray-800', img: '/phones/apple.png' },
            { brand: 'Realme', bg: 'bg-yellow-100', img: '/phones/realme.png' },
            { brand: 'Xiaomi', bg: 'bg-orange-100', img: '/phones/xiaomi.png' },
          ].map((item, i) => (
            <div
              key={i}
              className={`min-w-[250px] rounded-xl p-4 text-white shadow-md flex items-center gap-4 ${item.bg}`}
            >
              <div className="text-lg font-bold">{item.brand}</div>
              <Image src={item.img} alt={item.brand} width={100} height={100} />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Daily Essentials */}
      <section className="container mx-auto px-4 py-6">
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
              <Image
                src={`/essentials/${item.toLowerCase().replace(' ', '-')}.png`}
                alt={item}
                width={80}
                height={80}
                className="mx-auto mb-1"
              />
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

