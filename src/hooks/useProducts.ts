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

// ============= GLOBAL CACHE (shared across all hook instances) =============
let cachedProducts: Product[] | null = null;
let loadingPromise: Promise<Product[]> | null = null;

const fetchProducts = async (): Promise<Product[]> => {
  // If already cached, return immediately
  if (cachedProducts && cachedProducts.length > 0) {
    console.log(`📦 Using cached ${cachedProducts.length} products`);
    return cachedProducts;
  }

  // If already loading, wait for the same promise (no duplicate fetches)
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    // 1. Load fallback first (fast) - but only if we don't have cache
    let fallbackProducts: Product[] = [];
    try {
      const fallbackResponse = await fetch('/products.json');
      if (fallbackResponse.ok) {
        fallbackProducts = await fallbackResponse.json();
        console.log(`✅ Loaded ${fallbackProducts.length} products from products.json (fallback)`);
        cachedProducts = fallbackProducts;
      }
    } catch (err) {
      console.warn('Fallback load failed:', err);
    }

    // 2. Load Supabase (authoritative) - this OVERWRITES fallback
    try {
      const response = await fetch('/.netlify/functions/get-products');
      if (response.ok) {
        const supabaseProducts = await response.json();
        if (supabaseProducts && supabaseProducts.length > 0) {
          console.log(`✅ Loaded ${supabaseProducts.length} products from Supabase (authoritative)`);
          cachedProducts = supabaseProducts;
        } else {
          console.log('⚠️ Supabase returned 0 products, keeping fallback');
        }
      } else {
        console.log('⚠️ Supabase function failed, keeping fallback');
      }
    } catch (err) {
      console.warn('Supabase load failed, keeping fallback:', err);
    }

    return cachedProducts || [];
  })();

  const result = await loadingPromise;
  loadingPromise = null; // allow reload later
  return result;
};

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    // Force refresh - clear cache
    cachedProducts = null;
    loadingPromise = null;
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchProducts();
      setProducts(result);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      // If cache is already populated, use it immediately
      if (cachedProducts && cachedProducts.length > 0) {
        setProducts(cachedProducts);
        setLoading(false);
        return;
      }

      try {
        const result = await fetchProducts();
        if (mounted) {
          setProducts(result);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load products');
          setLoading(false);
        }
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const addProduct = (product: Product) => {
    setProducts(prev => {
      const updated = [...prev, product];
      cachedProducts = updated;
      return updated;
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      cachedProducts = updated;
      return updated;
    });
  };

  const removeProduct = (id: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      cachedProducts = updated;
      return updated;
    });
  };

  return { products, loading, error, addProduct, updateProduct, removeProduct, reloadProducts: loadProducts };
};