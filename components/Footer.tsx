// import Link from 'next/link';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Column 1: Logo + tagline */}
//         <div>
//           <Link href="/" className="text-2xl font-bold text-white">
//             Ranchi Bazaar
//           </Link>
//           <p className="mt-2 text-sm text-gray-400">
//             Your one-stop shop for everything awesome.
//           </p>
//         </div>

//         {/* Column 2: Shop Links */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Shop</h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
//             <li><Link href="/collections/sale" className="hover:text-white">Sale</Link></li>
//             <li><Link href="/collections/new" className="hover:text-white">New Arrivals</Link></li>
//           </ul>
//         </div>

//         {/* Column 3: Company */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Company</h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/about" className="hover:text-white">About Us</Link></li>
//             <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
//             <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
//           </ul>
//         </div>

//         {/* Column 4: Social / Newsletter */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
//           <p className="text-sm mb-3 text-gray-400">Subscribe to our newsletter for updates.</p>
//           <form className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="w-full px-3 py-2 rounded-md text-sm text-black"
//             />
//             <button
//               type="submit"
//               className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
//         &copy; {new Date().getFullYear()} Ranchi Bazaar. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt, FaApple } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';

const Footer = () => {
  return (
    <footer
      className="text-white py-10 px-6"
      style={{
        background: "linear-gradient(90deg, #2C3454 7%, #83CA95 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center mb-2 space-x-2">
            <FaWhatsapp size={20} />
            <span>WhatsApp +1 202-918-2132</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt size={20} />
            <span>Call Us +1 202-918-2132</span>
          </div>

          <h3 className="font-semibold mt-8 mb-3">Download App</h3>
          {/* New styled buttons container */}
          <div className="flex space-x-4">
            <Link
              href="https://apps.apple.com/app/apple-store/idxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-80 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-opacity-100 transition"
            >
              <FaApple size={40} />
              <div className="leading-tight text-white">
                <p className="text-xs font-light">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </Link>

            <Link
              href="https://play.google.com/store/apps/details?id=xxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-80 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-opacity-100 transition"
            >
              <SiGoogleplay size={40} />
              <div className="leading-tight text-white">
                <p className="text-xs font-light">Get it on</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </Link>
          </div>
        </div>


        {/* Most Popular Categories */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white w-44 pb-1">Most Popular Categories</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables & Fruits</li>
            <li>Snacks & Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white w-36 pb-1">Customer Services</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/ewaste" className="hover:underline">E-waste Policy</Link></li>
            <li><Link href="/cancellation" className="hover:underline">Cancellation & Return Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="mt-10 text-center text-sm text-white/80 border-t border-white/20 pt-4">
        © 2025 All rights reserved. Ranchi Bazaar Ltd.
      </div>
    </footer>
  );
};

export default Footer;


