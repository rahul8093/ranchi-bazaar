import { useState } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'framer-motion';
import clsx from 'clsx';


interface RippleWithHoverButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    hoverEffect?: VariantLabels | TargetAndTransition | undefined;
}

export const RippleWithHoverButton = ({
    onClick,
    children = 'ADD',
    className = '',
    hoverEffect = {
        scale: 1.03,
        boxShadow: '0px 0px 8px rgba(34, 197, 94, 0.7)',
    },
}: RippleWithHoverButtonProps) => {
    const [ripple, setRipple] = useState(false);

    const handleClick = () => {
        setRipple(true);
        // onClick();
        if(onClick){
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
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                />
            )}
        </motion.button>
    );
};
