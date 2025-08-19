'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BackButton({
    className = '',
    hideIfNoHistory = true,
}: {
    className?: string
    hideIfNoHistory?: boolean
}) {
    const router = useRouter()
    const [canGoBack, setCanGoBack] = useState(false)

    useEffect(() => {
        // Most browsers return 1 if there's no history
        if (typeof window !== 'undefined') {
            setCanGoBack(window.history.length > 1)
        }
    }, [])

    if (hideIfNoHistory && !canGoBack) return null

    return (
        <button
            onClick={() => router.back()}
            disabled={!canGoBack}
            className={`text-sm px-3 py-1 flex justify-center items-center hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <IoIosArrowRoundBack />Go Back
        </button>

        //         <button
        //     onClick={() => router.back()}
        //     className="text-blue-600 hover:underline px-4 py-2 rounded flex justify-center items-center"
        // >
        //     <IoIosArrowRoundBack />Go Back
        // </button>
    )
}
