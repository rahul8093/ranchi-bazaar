'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { SearchIcon, ListIcon } from 'lucide-react';
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from '../Logo/Logo';
import UserLogo from '../Logo/UserLogo';
import UserDropdown from '../UserDropdown';
import Sidebar from '../SideBar';
import Spinner from '../Spinner';
import { BouncyCartIcon } from '../BouncyCartIcon';
import { FiMenu, FiX } from 'react-icons/fi';

interface MiddleBarProps {
    setIsSidebarOpen: (open: boolean) => void;
    setMiniCartOpen: (open: boolean) => void;
    setMobileMenuOpen: (open: boolean) => void;
    mobileMenuOpen: boolean;
    isSidebarOpen: boolean;
}

const MiddleBar = ({ setIsSidebarOpen, setMiniCartOpen, mobileMenuOpen, setMobileMenuOpen,isSidebarOpen }: MiddleBarProps) => {
    const { cartCount } = useCart();
    const { loading } = useCurrentUser();

    return (
        <div className="bg-white shadow-md py-2 px-4 flex items-center justify-between gap-4 flex-wrap">
            {/* Sidebar + Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="hidden md:flex w-10 h-10 bg-white rounded-lg shadow items-center justify-center hover:border-green-500 hover:shadow-[0_0_12px_#83CA95]"
                >
                    <HiMenuAlt2 />
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <Link href="/">
                    <Logo />
                </Link>
            </div>

            {/* Search */}
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

            {/* User & Cart */}
            <div className="flex items-center gap-4">
                {loading ? (
                    <span className="flex items-center gap-2 text-sm text-gray-700 cursor-default">
                        <UserLogo />
                        <Spinner/>
                    </span>
                ) : (
                    <UserDropdown />
                )}

                <button
                    onClick={() => setMiniCartOpen(true)}
                    className="flex hover:scale-110 items-center gap-2 relative text-gray-700 hover:text-black"
                >
                    <BouncyCartIcon />
                    <span className="text-sm">Cart</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                </button>

                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </div>
    );
};

export default MiddleBar;
