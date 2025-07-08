import React from 'react';
import { useCart } from '@/pages/Home/CartContext';

function formatPrice(price: number) {
    return price.toLocaleString('vi-VN') + ' ₫';
}

interface CartDropdownProps {
    open: boolean;
    onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ open, onClose }) => {
    const { cart, removeFromCart, getTotalPrice } = useCart();
    if (!open) return null;
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border z-50 p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Cart</span>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
            </div>
            {cart.length === 0 ? (
                <div className="text-gray-500 text-center py-8">Your cart is empty.</div>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto mb-3">
                        {cart.map((item) => (
                            <li key={item.product.id} className="flex items-center justify-between py-2 gap-2">
                                <div className="flex-1">
                                    <div className="font-medium text-sm">{item.product.name}</div>
                                    <div className="text-xs text-gray-500">{formatPrice(item.product.price)} × {item.quantity}</div>
                                </div>
                                <div className="font-semibold text-green-700 text-sm">{formatPrice(item.product.price * item.quantity)}</div>
                                <button
                                    className="ml-2 text-red-500 hover:text-red-700 text-lg"
                                    onClick={() => removeFromCart(item.product.id)}
                                    aria-label="Remove item"
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center font-bold text-base mb-3">
                        <span>Total:</span>
                        <span className="text-green-700">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">View Cart</button>
                </>
            )}
        </div>
    );
};

export default CartDropdown; 