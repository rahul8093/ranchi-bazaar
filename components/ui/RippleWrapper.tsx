import { useRef, useState } from 'react';
import clsx from 'clsx';

interface RippleWrapperProps {
    children: React.ReactNode;
    className?: string;
    rippleColor?: string; // Tailwind or hex (e.g., 'bg-green-400' or '#4ade80')
    duration?: number; // in ms
}

export const RippleWrapper = ({
    children,
    className = '',
    rippleColor = 'bg-green-400',
    duration = 600,
}: RippleWrapperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ripples, setRipples] = useState<
        { x: number; y: number; id: number }[]
    >([]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, duration);
    };

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            className={clsx('relative overflow-hidden cursor-pointer', className)}
        >
            {children}

            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className={clsx(
                        'absolute rounded-full pointer-events-none animate-ripple-wrapper',
                        rippleColor
                    )}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        animationDuration: `${duration}ms`,
                    }}
                />
            ))}
        </div>
    );
};
