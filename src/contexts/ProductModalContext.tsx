import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import ProductModal from '../components/ProductModal/ProductModal';

interface ProductModalContextType {
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  const openProduct = (p: Product) => setProduct(p);
  const closeProduct = () => setProduct(null);

  return (
    <ProductModalContext.Provider value={{ openProduct, closeProduct }}>
      {children}
      <ProductModal product={product} onClose={closeProduct} />
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const ctx = useContext(ProductModalContext);
  if (!ctx) throw new Error('useProductModal must be used inside ProductModalProvider');
  return ctx;
}
