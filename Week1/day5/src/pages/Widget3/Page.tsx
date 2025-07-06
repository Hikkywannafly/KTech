import React, { useState } from 'react';
import { CartProvider } from './CartContext';
import ProductGrid from '@/components/ProductGrid';
import CartIcon from '@/components/CartIcon';
import CartDropdown from '@/components/CartDropdown';

const Page: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-gray-50 pb-10">
        <header className="flex justify-end items-center px-6 py-4 bg-white shadow sticky top-0 z-40">
          <div className="relative">
            <CartIcon onClick={() => setCartOpen((v) => !v)} />
            <div className="absolute right-0">
              <CartDropdown open={cartOpen} onClose={() => setCartOpen(false)} />
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 pt-8">
          <ProductGrid />
        </main>
      </div>
    </CartProvider>
  );
};

export default Page;
