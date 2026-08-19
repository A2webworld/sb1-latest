import { useState, useEffect } from 'react';
import { Product } from '../types';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  reloadProducts: () => Promise<void>;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load from Supabase via Netlify function
      const response = await fetch('/.netlify/functions/get-products');
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log(`✅ Loaded ${data.length} products from Supabase`);
      } else {
        // Fallback: Try loading from products.json
        console.warn('Failed to load from Supabase, trying products.json...');
        const fallbackResponse = await fetch('/products.json');
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          setProducts(data);
          console.log(`✅ Loaded ${data.length} products from products.json (fallback)`);
        } else {
          setProducts([]);
          setError('Failed to load products');
        }
      }
    } catch (err) {
      console.error('Error loading products:', err);
      // Fallback: Try products.json
      try {
        const fallbackResponse = await fetch('/products.json');
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          setProducts(data);
          console.log(`✅ Loaded ${data.length} products from products.json (fallback)`);
        } else {
          setProducts([]);
          setError('Failed to load products');
        }
      } catch (fallbackErr) {
        setProducts([]);
        setError('Failed to load products');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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