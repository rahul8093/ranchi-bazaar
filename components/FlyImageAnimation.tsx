// components/CartFlyAnimation.tsx
'use client';

// import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';

type FlyImageProps = {
    imageUrl: string;
    from: DOMRect;
    to: DOMRect;
    onComplete: () => void;
};

export const FlyImage = ({ imageUrl, from, to, onComplete }: FlyImageProps) => {
    return createPortal(
        <motion.div
            initial={{
                top: from.top,
                left: from.left,
                width: from.width,
                height: from.height,
                position: 'fixed',
            }}
            animate={{
                top: to.top,
                left: to.left,
                width: 20,
                height: 20,
                opacity: 0.5,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
            style={{ zIndex: 9999 }}
        >
            <Image src={imageUrl} alt="Flying to cart" fill className="object-contain" />
        </motion.div>,
        document.body
    );
};
