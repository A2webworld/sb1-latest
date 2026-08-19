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
      // FIRST: Load from products.json (always available)
      const fallbackResponse = await fetch('/products.json');
      let fallbackProducts: Product[] = [];
      
      if (fallbackResponse.ok) {
        fallbackProducts = await fallbackResponse.json();
        console.log(`✅ Loaded ${fallbackProducts.length} products from products.json (fallback)`);
        // Set products immediately so user sees something
        setProducts(fallbackProducts);
      }
      
      // THEN: Try to load from Supabase (to get latest updates)
      try {
        const response = await fetch('/.netlify/functions/get-products');
        
        if (response.ok) {
          const supabaseProducts = await response.json();
          if (supabaseProducts && supabaseProducts.length > 0) {
            console.log(`✅ Loaded ${supabaseProducts.length} products from Supabase`);
            setProducts(supabaseProducts);
          } else {
            console.log('⚠️ Supabase returned 0 products, using fallback');
            // Keep using fallback products
          }
        } else {
          console.log('⚠️ Supabase function failed, using fallback products');
        }
      } catch (supabaseError) {
        console.log('⚠️ Supabase error, using fallback products:', supabaseError);
        // Keep using fallback products
      }
      
    } catch (err) {
      console.error('Error loading products:', err);
      // Try one more time with products.json
      try {
        const response = await fetch('/products.json');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(`✅ Loaded ${data.length} products from products.json (final fallback)`);
        } else {
          setProducts([]);
          setError('Failed to load products');
        }
      } catch (finalErr) {
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