import { useState } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'framer-motion';
import clsx from 'clsx';


interface RippleWithHoverButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    hoverEffect?: VariantLabels | TargetAndTransition | undefined;
    rippleColor?:string
}

export const RippleWithHoverButton = ({
    onClick,
    children = 'ADD',
    className = '',
    hoverEffect = {
        scale: 1.03,
        boxShadow: '0px 0px 8px rgba(34, 197, 94, 0.7)',
    },
    rippleColor,
}: RippleWithHoverButtonProps) => {
    const [ripple, setRipple] = useState(false);

    const handleClick = () => {
        setRipple(true);
        // onClick();
        if (onClick) {
            onClick()
        }
        setTimeout(() => setRipple(false), 500);
    };

    return (
        <motion.button
            whileHover={hoverEffect}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            className={clsx(
                // 'overflow-hidden relative',
                className
            )}
        >
            {children}

            {ripple && (
                <motion.span
                    initial={{ scaleX: 0, opacity: 0.5 }}
                    animate={{ scaleX: 4, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className={`absolute w-full h-full top-1/2 left-1/2 ${rippleColor||'bg-green-400'}  rounded pointer-events-none transform -translate-x-1/2 -translate-y-1/2 origin-center`}
                />

            )}
        </motion.button>
    );
};
