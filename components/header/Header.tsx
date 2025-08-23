'use client';

import { useEffect, useState } from 'react';
// import TopBar from './TopBar';
import MiddleBar from './MiddleBar';
import { useCart } from '@/app/context/CartContext';
import MiniCart from '../MiniCart';
import { MenuItem } from '@/app/lib/saleor/types/menu';
import { getMenuItems } from '@/app/lib/saleor/helpers/getMenu';
import { CategoryNavigationMenu, MobileCategoryNavigationMenu } from '../CategoryNavigationMenu';
import AnimatedStickyHeader from '../AnimatedHeader';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const { cartCount, cartItems, totalPrice, updateCartItem, removeCartItem, loadingProductId } = useCart();

  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);


      useEffect(() => {
          async function fetchMenu() {
              setLoadingMenu(true)
              const menu = await getMenuItems();
              if (menu?.items) {
                  setMenuItems(menu.items);
                  setLoadingMenu(false)
              }
          }
          fetchMenu();
      }, []);

  return (
    <header className="w-full py-1.5 rounded-b-2xl">
      {/* <TopBar /> */}
      <AnimatedStickyHeader>
        <MiddleBar
        setIsSidebarOpen={setIsSidebarOpen}
        setMiniCartOpen={setMiniCartOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        isSidebarOpen={isSidebarOpen}
      />
      </AnimatedStickyHeader>
      <MiddleBar
        setIsSidebarOpen={setIsSidebarOpen}
        setMiniCartOpen={setMiniCartOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <CategoryNavigationMenu items={menuItems} />
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.35 }}
          >
            <MobileCategoryNavigationMenu items={menuItems} loading={loadingMenu} />
          </motion.div>
        )}
      </AnimatePresence>


      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
        total={totalPrice}
        updateCartItem={updateCartItem}
        removeCartItem={removeCartItem}
        loadingProductId={loadingProductId}
        cartCount={cartCount}
      />
    </header>
  );
};

export default Header;
