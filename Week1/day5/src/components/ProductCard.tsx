import React from 'react';
import { Product } from '@/pages/Widget3/types/Product';

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onChangeQuantity: (qty: number) => void;
}

function formatPrice(price: number) {
    return price.toLocaleString('vi-VN') + ' ₫';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onAdd, onRemove, onChangeQuantity }) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-between h-full">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-full mb-3" />
            <div className="font-semibold text-center mb-2">{product.name}</div>
            <div className="text-lg font-bold text-green-700 mb-4">{formatPrice(product.price)}</div>
            <div className="flex items-center gap-2 mb-3">
                <button
                    className="w-8 h-8 rounded bg-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => onChangeQuantity(quantity - 1)}
                    disabled={quantity === 0}
                >
                    -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                    className="w-8 h-8 rounded bg-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-300"
                    onClick={() => onChangeQuantity(quantity + 1)}
                >
                    +
                </button>
            </div>
            {quantity === 0 && (
                <button
                    className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                    onClick={onAdd}
                >
                    Add to cart
                </button>
            )}
            {quantity > 0 && (
                <button
                    className="mt-auto text-red-500 text-sm hover:underline"
                    onClick={onRemove}
                >
                    Remove
                </button>
            )}
        </div>
    );
};

export default ProductCard; 