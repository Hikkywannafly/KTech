import React from 'react';
import { Product } from '@/pages/Widget3/types/Product';
import styles from './ProductCard.module.css';

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
        <div className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.name}>{product.name}</div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
            <div className={styles.quantityRow}>
                <button
                    className={styles.quantityBtn}
                    onClick={() => onChangeQuantity(quantity - 1)}
                    disabled={quantity === 0}
                >
                    -
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                    className={styles.quantityBtn}
                    onClick={() => onChangeQuantity(quantity + 1)}
                >
                    +
                </button>
            </div>
            {quantity === 0 && (
                <button
                    className={styles.addBtn}
                    onClick={onAdd}
                >
                    Add to cart
                </button>
            )}
            {quantity > 0 && (
                <button
                    className={styles.removeBtn}
                    onClick={onRemove}
                >
                    Remove
                </button>
            )}
        </div>
    );
};

export default ProductCard; 