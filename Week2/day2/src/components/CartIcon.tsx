import React from 'react';
import { useCart } from '@/pages/Home/CartContext';

interface CartIconProps {
    onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
    const { getTotalItems } = useCart();
    const total = getTotalItems();
    return (
        <button
            className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100 transition focus:outline-none"
            onClick={onClick}
            aria-label="View cart"
        >
            <span className="text-2xl">🛒</span>
            {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                    {total}
                </span>
            )}
        </button>
    );
};

export default CartIcon; 