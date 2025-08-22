'use client';

import { FlyImage } from '@/components/FlyImageAnimation';
import { createContext, useContext, useState } from 'react';

type FlyImageData = {
    imageUrl: string;
    from: DOMRect;
    to: DOMRect;
};

type CartFlyContextType = {
    flyToCart: (data: FlyImageData) => void;
    bounceCart: () => void;
};

const CartFlyContext = createContext<CartFlyContextType | null>(null);

export const useCartFly = () => {
    const context = useContext(CartFlyContext);
    if (!context) throw new Error('useCartFly must be used within CartFlyProvider');
    return context;
};

export const CartFlyProvider = ({ children }: { children: React.ReactNode }) => {
    const [flyData, setFlyData] = useState<FlyImageData | null>(null);

    const flyToCart = (data: FlyImageData) => {
        setFlyData(data);

        // Play sound
        // const audio = new Audio('/sounds/pop.mp3');
        // audio.volume = 0.3;
        // audio.play().catch(() => {
        //     // ignored due to browser autoplay policy
        // });

        // Vibrate
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(100);
        }
    };

    const bounceCart = () => {
        // Trigger a custom event the cart icon can listen to
        window.dispatchEvent(new Event('cart:bounce'));
    };

    const handleComplete = () => {
        setFlyData(null);
        bounceCart();
    };

    return (
        <CartFlyContext.Provider value={{ flyToCart, bounceCart }}>
            {children}
            {flyData && (
                <FlyImage
                    imageUrl={flyData.imageUrl}
                    from={flyData.from}
                    to={flyData.to}
                    onComplete={handleComplete}
                />
            )}
        </CartFlyContext.Provider>
    );
};
