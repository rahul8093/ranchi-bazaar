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
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { useCart } from '@/app/context/CartContext';
import MiniCart from './MiniCart';
import { CategoryNavigationMenu, MobileCategoryNavigationMenu } from './CategoryNavigationMenu';
import UserDropdown from './UserDropdown';
// import { useCart } from '@/app/hooks/useCart';


const Header = () => {
  const { cartCount, cartItems, totalPrice, updateCartItem, removeCartItem, loadingProductId } = useCart();
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading } = useCurrentUser();
  // const total = 989

  // const categories = [
  //   'Groceries',
  //   'Premium Fruits',
  //   'Home & Kitchen',
  //   'Fashion',
  //   'Electronics',
  //   'Beauty',
  //   'Home Improvement',
  //   'Sports, Toys & Luggage',
  // ];

  return (
    <header className="w-full md:mb-8">
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
            className="hidden md:flex w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center hover:border-green-500 hover:shadow-[0_0_12px_#83CA95]"
          >
            <HamburgerIcon />
          </button>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-[507px] w-full hidden md:block hover:border-green-500 hover:shadow-[0_0_12px_#83CA95]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <SearchIcon />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
            <ListIcon />
          </div>
          <input
            type="text"
            placeholder="Search essentials, groceries and more..."
            className="rounded-x1 shadow-md w-full text-black pl-8 pr-8 py-2 border rounded-md text-sm shadow-md-rb focus-visible:border-green-500"
          />
        </div>

        {/* User + Cart */}
        <div className="flex items-center gap-4">
          {/* User */}
          {loading ? (
            <span className="flex items-center gap-2 text-sm text-gray-700 cursor-default">
              <UserLogo />
              Loading...
            </span>
          ) : (
            <UserDropdown />
          )}




          {/* Cart */}
          <button onClick={() => setMiniCartOpen(true)} className="flex hover:scale-110 items-center gap-2 relative text-gray-700 hover:text-black">
            <FiShoppingCart size={22} />
            <span className="text-sm">Cart</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/*  Bottom Category Nav */}
      {/* <div className="bg-white border-t shadow-sm py-2 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 whitespace-nowrap">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`text-sm px-4 py-2 rounded shadow ${index === 0 ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
                } hover:shadow-md border`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div> */}
      <div className='hidden md:flex'>
        <CategoryNavigationMenu />
      </div>


      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          {/* {categories.map((cat, index) => (
            <Link href="/" key={index} className="block text-gray-700">
              {cat}
            </Link>
          ))} */}
          <MobileCategoryNavigationMenu/>
        </div>
      )}
      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
        total={totalPrice}
        updateCartItem={updateCartItem}
        removeCartItem={removeCartItem}
        loadingProductId={loadingProductId} 
        cartCount={cartCount}      />
    </header>
  );
};

export default Header;
