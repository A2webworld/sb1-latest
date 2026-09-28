import { useState, useEffect, useRef } from 'react';
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
  const supabaseWon = useRef(false);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    supabaseWon.current = false;

    // 1. Load fallback first (fast)
    try {
      const fallbackResponse = await fetch('/products.json');
      if (fallbackResponse.ok && !supabaseWon.current) {
        const fallbackProducts = await fallbackResponse.json();
        console.log(`✅ Loaded ${fallbackProducts.length} products from products.json (fallback)`);
        setProducts(fallbackProducts);
      }
    } catch (err) {
      console.warn('Fallback load failed:', err);
    }

    // 2. Load Supabase (authoritative source)
    try {
      const response = await fetch('/.netlify/functions/get-products');
      if (response.ok) {
        const supabaseProducts = await response.json();
        if (supabaseProducts && supabaseProducts.length > 0) {
          console.log(`✅ Loaded ${supabaseProducts.length} products from Supabase`);
          supabaseWon.current = true;
          setProducts(supabaseProducts);
        }
      }
    } catch (err) {
      console.warn('Supabase load failed:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (id: string, updates: Partial<Product>) =>
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  const removeProduct = (id: string) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  return { products, loading, error, addProduct, updateProduct, removeProduct, reloadProducts: loadProducts };
};