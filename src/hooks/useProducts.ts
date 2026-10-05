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

let cachedProducts: Product[] | null = null;
let loadingPromise: Promise<Product[]> | null = null;

const fetchProducts = async (): Promise<Product[]> => {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts;
  }
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    let fallbackProducts: Product[] = [];

    // 1. Fallback — /public/products.json (48 items)
    try {
      const fallbackResponse = await fetch('/products.json?t=' + Date.now());
      if (fallbackResponse.ok) {
        fallbackProducts = await fallbackResponse.json();
        console.log(`✅ Loaded ${fallbackProducts.length} products from products.json (fallback)`);
        cachedProducts = fallbackProducts;
      }
    } catch (err) {
      console.warn('Fallback load failed:', err);
    }

    // 2. Supabase via Netlify function — authoritative
    try {
      const response = await fetch('/.netlify/functions/get-products?t=' + Date.now());
      if (response.ok) {
        const supabaseProducts = await response.json();
        if (Array.isArray(supabaseProducts) && supabaseProducts.length > 0) {
          console.log(`✅ Loaded ${supabaseProducts.length} products from Supabase (authoritative)`);
          cachedProducts = supabaseProducts;
        } else {
          console.log('⚠ Supabase returned 0 products, keeping fallback');
        }
      } else {
        const errText = await response.text().catch(() => '');
        console.log(`⚠ Supabase function returned ${response.status}. Body: ${errText.slice(0, 200)}`);
      }
    } catch (err) {
      console.warn('Supabase load failed, keeping fallback:', err);
    }

    return cachedProducts || [];
  })();

  const result = await loadingPromise;
  loadingPromise = null;
  return result;
};

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
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
