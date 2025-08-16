'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { toast } from 'react-hot-toast';
import { request } from 'graphql-request';
import {
    getCheckoutToken,
    setCheckoutToken,
} from '../lib/saleor/helpers/cookies.client';
import { CheckoutData, CheckoutLine, GET_CHECKOUT_QUERY } from '../lib/saleor/queries/fetchCheckout';

const SALEOR_API = process.env.NEXT_PUBLIC_API_URI as string;

interface CartContextType {
    addToCart: (variantId: string, quantity?: number) => Promise<void>;
    loadingProductId: string | null;
    cartCount: number;
    cartItems: CheckoutLine[];
    refreshCart: () => void;
    totalPrice: number;
 updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  removeCartItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CheckoutLine[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const fetchCheckout = async () => {
        const checkoutToken = getCheckoutToken();
        if (!checkoutToken) return;

        try {
            const res = await request<CheckoutData>(SALEOR_API, GET_CHECKOUT_QUERY, {
                token: checkoutToken,
            });

            const lines = res.checkout?.lines ?? [];

            const totalQty = lines.reduce((sum, line) => sum + line.quantity, 0);
            const price = res.checkout?.totalPrice?.gross?.amount ?? 0;

            setCartItems(lines);
            setCartCount(totalQty);
            setTotalPrice(price)
        } catch (err) {
            console.error('Failed to fetch checkout:', err);
        }
    };

    const addToCart = async (variantId: string, quantity = 1) => {
        setLoadingProductId(variantId);

        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                body: JSON.stringify({ variantId, quantity }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Failed to add to cart');
            }

            if (data?.checkout?.token) {
                setCheckoutToken(data.checkout.token);
            }

            toast.success('Added to cart!');
            await fetchCheckout(); // Refresh cart items & count
        } catch (err) {
            toast.error('Error adding to cart');
            console.error(err);
        } finally {
            setLoadingProductId(null);
        }
    };

    const updateCartItem = async (lineId: string, quantity: number) => {
        setLoadingProductId(lineId);
        try {
            const res = await fetch('/api/cart/update', {
                method: 'POST',
                body: JSON.stringify({ lineId, quantity }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update cart item');
            toast.success('Cart updated');
            await fetchCheckout();
        } catch (err) {
            toast.error('Failed to update cart item');
            console.error(err);
        } finally {
            setLoadingProductId(null);
        }
    };

    const removeCartItem = async (lineId: string) => {
        setLoadingProductId(lineId);
        try {
            const res = await fetch('/api/cart/remove', {
                method: 'POST',
                body: JSON.stringify({ lineId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to remove cart item');
            toast.success('Item removed');
            await fetchCheckout();
        } catch (err) {
            toast.error('Failed to remove cart item');
            console.error(err);
        } finally {
            setLoadingProductId(null);
        }
    };


    useEffect(() => {
        fetchCheckout();
    }, []);

    return (
        <CartContext.Provider
            value={{
                addToCart,
                updateCartItem,
                removeCartItem,
                loadingProductId,
                cartCount,
                cartItems,
                totalPrice,
                refreshCart: fetchCheckout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
