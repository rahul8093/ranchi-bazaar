'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface Ripple {
    id: number;
    x: number;
    y: number;
}

interface RippleButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

let rippleId = 0;

const RippleButton: React.FC<RippleButtonProps> = ({ children, onClick, className = '' }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple = { id: rippleId++, x, y };
        setRipples((prev) => [...prev, newRipple]);

        onClick?.();

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: 100,
                            height: 100,
                            top: ripple.y,
                            left: ripple.x,
                        }}
                    />
                ))}
            </AnimatePresence>
        </button>
    );
};

export default RippleButton;
