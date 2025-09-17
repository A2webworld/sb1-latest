import { useState, useEffect } from 'react';
import { Product } from '../types';
import { products as defaultProducts } from '../data/products';
import { loadProductsFromJSON, validateProduct } from '../utils/productLoader';

export const useProducts = (loadFromJSON: boolean = false, jsonPath?: string) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loadFromJSON && jsonPath) {
      loadProducts();
    }
  }, [loadFromJSON, jsonPath]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const loadedProducts = await loadProductsFromJSON(jsonPath!);
      const validProducts = loadedProducts.filter(validateProduct);
      
      if (validProducts.length !== loadedProducts.length) {
        console.warn(`${loadedProducts.length - validProducts.length} invalid products were filtered out`);
      }
      
      setProducts(validProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    removeProduct,
    reloadProducts: loadProducts
  };
};