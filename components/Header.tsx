// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// import Sidebar from './SideBar';
// import Logo from './Logo/Logo';
// import HamburgerIcon from './HamburgerIcon';
// import UserLogo from './Logo/UserLogo';
// import SearchIcon from './Logo/SearchIcon';
// import ListIcon from './Logo/ListIcon';


// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <header className="w-full bg-white shadow-md">
//       <div className='container'>
//         {/* <div className="flex justify-between items-center"> */}
//         <div className="flex items-center space-x-2" id="HeaderTop">
//           {/* Logo or Sidebar Toggle */}
//         </div>


//         <div className="flex items-center" id="HeaderMiddle">
//           {/* Side bar + Logo */}
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center
//             transition-all duration-300 hover:border-green-500 hover:shadow-[0_0_12px_#83CA95]"
//             >
//               <HamburgerIcon />
//             </button>
//             <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//             {/* Logo */}
//             <Link href="/">
//               <Logo />
//             </Link>
//           </div>


//           {/* Search + Cart */}
//           <div className="flex items-center space-x-4 w-full justify-end">
//             {/* Search (optional, can add input logic) */}
//             <div className="relative hidden md:block max-w-[507px] w-full">
//               {/* Search Icon (left) */}
//               <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
//                 <SearchIcon />
//               </div>

//               {/* List Icon (right) */}
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
//                 <ListIcon />
//               </div>

//               {/* Input Field */}
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full pl-8 pr-8 py-1 border rounded-md text-sm shadow-md-rb"
//               />
//             </div>


//             {/* Login / Profile */}
//             <div className="flex items-center space-x-2 cursor-pointer">
//               {/* User Icon */}
//               <div className=" flex items-center justify-center">
//                 <UserLogo />
//               </div>
//               {/* Dynamic Text */}
//               <span className="text-sm text-gray-700">
//                 {'Hello, xyz'}
//               </span>
//             </div>
//             {/* Vertical Divider */}
//             <div className="h-6 w-px bg-gray-300" />

//             {/* Cart */}
//             <Link href="/cart" className="flex gap-2 relative text-gray-600 hover:text-gray-900">
//               <div className='relative'>
//                 <FiShoppingCart size={24} />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//                   3
//                 </span>
//               </div>

//               <span>Cart</span>
//             </Link>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden text-gray-600 hover:text-gray-900"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Toggle mobile menu"
//             >
//               {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           </div>

//         </div>


//         <div className="flex items-center space-x-4" id="HeaderBottom">
//           {/* Desktop Nav */}
//           <nav className="hidden md:flex space-x-6">
//             <Link href="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
//             <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
//             <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
//           </nav>
//         </div>

//       </div>
//       {/* </div> */}

//       {/* Mobile Nav */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white px-4 pb-4 space-y-2">
//           <Link href="/shop" className="block text-gray-700">Shop</Link>
//           <Link href="/about" className="block text-gray-700">About</Link>
//           <Link href="/contact" className="block text-gray-700">Contact</Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import Sidebar from './SideBar';
import Logo from './Logo/Logo';
import HamburgerIcon from './HamburgerIcon';
import UserLogo from './Logo/UserLogo';
import SearchIcon from './Logo/SearchIcon';
import ListIcon from './Logo/ListIcon';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    'Groceries',
    'Premium Fruits',
    'Home & Kitchen',
    'Fashion',
    'Electronics',
    'Beauty',
    'Home Improvement',
    'Sports, Toys & Luggage',
  ];

  return (
    <header className="w-full">
      {/* ✅ Top Bar */}
      <div className="bg-[#3b487f] text-white text-sm py-2 px-4 flex justify-between items-center">
        <span>Welcome to Ranchi Bazaar</span>
        <div className="flex gap-4 items-center text-sm text-white">
          <span>📍 Deliver to <strong>835303</strong></span>
          <span>🚚 Track your order</span>
          <span>⚙️ All Offers</span>
        </div>
      </div>

      {/* ✅ Middle Bar */}
      <div className="bg-white shadow-md py-2 px-4 flex items-center justify-between gap-4 flex-wrap">
        {/* Sidebar + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center hover:border-green-500 hover:shadow-[0_0_12px_#83CA95]"
          >
            <HamburgerIcon />
          </button>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-[507px] w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <SearchIcon />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
            <ListIcon />
          </div>
          <input
            type="text"
            placeholder="Search essentials, groceries and more..."
            className="w-full pl-8 pr-8 py-2 border rounded-md text-sm shadow-md-rb"
          />
        </div>

        {/* User + Cart */}
        <div className="flex items-center gap-4">
          {/* User */}
          <div className="flex items-center gap-2 cursor-pointer">
            <UserLogo />
            <span className="text-sm text-gray-700">Hello, XYZ</span>
          </div>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-2 relative text-gray-700 hover:text-black">
            <FiShoppingCart size={22} />
            <span className="text-sm">Cart</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Mobile Menu Toggle (optional) */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ✅ Bottom Category Nav */}
      <div className="bg-white border-t shadow-sm py-2 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 whitespace-nowrap">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`text-sm px-4 py-2 rounded shadow ${
                index === 0 ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
              } hover:shadow-md border`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Mobile Nav (optional) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          {categories.map((cat, index) => (
            <Link href="/" key={index} className="block text-gray-700">
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;