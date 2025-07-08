import React, { useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
import ProductGrid from '../../components/ProductGrid1';
import Pagination from '../../components/Pagination';

const ProductPage: React.FC = () => {
    // State for selected categories, products, current page, and total products
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // TODO: Add data fetching logic

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 p-6 border-r bg-white hidden md:block">
                <CategoryFilter selected={selectedCategories} onChange={setSelectedCategories} />
            </aside>
            <main className="flex-1 p-6">
                <ProductGrid products={products} />
                <Pagination
                    currentPage={currentPage}
                    total={totalProducts}
                    pageSize={4}
                    onPageChange={setCurrentPage}
                />
            </main>
        </div>
    );
};

export default ProductPage; 