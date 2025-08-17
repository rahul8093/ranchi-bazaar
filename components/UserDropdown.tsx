'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import UserLogo from './Logo/UserLogo';
import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";


export default function UserDropdown() {
    const { user, logout,loading } = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const isSignIn = user?.email || user?.firstName
    const router = useRouter()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleUserMenuClick = () => {
        if (isSignIn) {
            setIsOpen((prev) => !prev);
        } else {
            router.push("/login");
        }
    };

    // const handleLogOut = () => {
    //     logout()
        
    // }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={handleUserMenuClick}

                className="flex items-center text-sm  text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 rounded-full"
            >
                <span className="sr-only">Open user menu</span>
                <UserLogo />
                <span className="flex items-center">
                    {isSignIn ? user?.firstName : 'Sign in'}
                    {isSignIn && <ChevronDown className="w-4 h-4 ms-2" />}
                </span>

            </button>

            {/* Dropdown menu */}
            {
                (isOpen && isSignIn) && (
                    <div className="absolute right-0 z-50 mt-2 w-44 rounded-lg shadow-sm bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium">{user?.firstName}</div>
                            <div className="truncate">{user?.email}</div>
                        </div>

                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <button
                                    type="button"
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "
                                    onClick={() => console.log("Settings clicked")} // Replace with your handler
                                >
                                    Settings
                                </button>
                            </li>
                        </ul>

                        <div className="py-2">
                            <button
                                type="button"
                                onClick={logout}
                                className="flex items-center justify-start gap-1 block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                            <BiLogOutCircle className={`${loading?'animate-spin':''}`}/>
                                Sign out
                            </button>
                        </div>
                    </div>

                )
            }
        </div >
    )
}
