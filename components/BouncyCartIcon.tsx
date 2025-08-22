import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

export const BouncyCartIcon = () => {
    const controls = useAnimation();

    useEffect(() => {
        const listener = () => {
            controls.start({
                scale: [1, 1.3, 0.95, 1.05, 1],
                transition: { duration: 0.5 },
            });
        };
        window.addEventListener('cart:bounce', listener);

        return () => window.removeEventListener('cart:bounce', listener);
    }, [controls]);

    return (
        <motion.div
            id="cart-icon"
            animate={controls}
            className="cursor-pointer"
        >
            <FiShoppingCart size={22} id='cart-icon' />
        </motion.div>
    );
};
