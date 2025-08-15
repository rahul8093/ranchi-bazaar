import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useAddToCart() {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const addToCart = async (productId: string, quantity = 1) => {
    setLoadingProductId(productId);
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ variantId: productId, quantity }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to add to cart');
      }

      toast.success('Added to cart!');
    } catch (err) {
      toast.error( 'Error adding to cart');
      console.error(err);
    } finally {
      setLoadingProductId(null);
    }
  };

  return { addToCart, loadingProductId };
}
