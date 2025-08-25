import { useRef } from 'react';
import clsx from 'clsx';

// === HoverRipple Component ===
interface HoverRippleProps {
    children: React.ReactNode;
    className?: string;
    rippleColor?: string;
    duration?: number;
}

export const HoverRipple = ({
    children,
    className = '',
    rippleColor = 'bg-green-400/50',
    duration = 600,
}: HoverRippleProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height) * 2;
        const radius = diameter / 2;
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;

        const span = document.createElement('span');
        span.className = `hover-ripple ${rippleColor}`;
        span.style.width = span.style.height = `${diameter}px`;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.animationDuration = `${duration}ms`;

        container.appendChild(span);
        setTimeout(() => {
            span.remove();
        }, duration);
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            className={clsx('relative overflow-hidden cursor-pointer', className)}
        >
            {children}
        </div>
    );
};

// === DontHoverBox Component ===
interface DontHoverBoxProps {
    children?: React.ReactNode;
    className?: string;
    duration?: number; // Shake duration in ms
}

export const DontHoverBox = ({
    children = "Don't Hover",
    className = '',
    duration = 600,
}: DontHoverBoxProps) => {
    const style: React.CSSProperties = {
        animationDuration: `${duration}ms`,
    };

    return (

        <div
            className={clsx(
                'hover-shake inline-block px-6 py-3 text-xl font-semibold bg-red-500 text-white rounded-md shadow-md cursor-pointer',
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
};
