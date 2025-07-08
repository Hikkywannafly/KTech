import React, { useEffect, useState } from 'react';
import { CartProvider } from './CartContext';

import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import { ProductSchema } from './types/Product';
import ProductGrid from '@/components/ProductGrid1';

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const pageSize = 4;
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        let url = '';
        if (selectedCategories.length === 0) {

          url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
        } else if (selectedCategories.length === 1) {
          url = `https://api.escuelajs.co/api/v1/categories/${selectedCategories[0]}/products?offset=${offset}&limit=${limit}`;
        } else {

          const allProducts: ProductSchema[] = [];
          for (const catId of selectedCategories) {
            const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${catId}/products?offset=0&limit=100`);
            if (res.ok) {
              const data = await res.json();
              allProducts.push(...data);
            }
          }
          const paged = allProducts.slice(offset, offset + limit);
          setProducts(paged);
          return;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategories, page]);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-gray-50 pb-10">
        <header className="flex justify-end items-center px-6 py-4 top-0 z-40">
        </header>
        <main className=" mx-auto px-4 pt-8 flex flex-row gap-8">
          <CategoryFilter selected={selectedCategories} onChange={setSelectedCategories} />
          <div className="">
            <ProductGrid products={products} />
            <Pagination
              currentPage={page}
              total={20}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        </main>
      </div>
    </CartProvider>
  );
};

export default Home;
