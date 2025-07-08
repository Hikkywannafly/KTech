import React from 'react';
import { products } from "@/pages/Home/data/products";
import ProductCard from './ProductCard';
import { useCart } from '@/pages/Home/CartContext';

const ProductGrid: React.FC = () => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
                const cartItem = cart.find((item) => item.product.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        onAdd={() => addToCart(product)}
                        onRemove={() => removeFromCart(product.id)}
                        onChangeQuantity={(qty) => updateQuantity(product.id, qty)}
                    />
                );
            })}
        </div>
    );
};

export default ProductGrid; 