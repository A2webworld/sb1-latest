import { Product } from '../types';

// Utility function to load products from JSON file or API
export const loadProductsFromJSON = async (jsonFile: string): Promise<Product[]> => {
  try {
    const response = await fetch(jsonFile);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Utility function to validate product data
export const validateProduct = (product: any): product is Product => {
  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.image === 'string' &&
    typeof product.category === 'string' &&
    typeof product.rating === 'number' &&
    typeof product.reviews === 'number' &&
    typeof product.description === 'string' &&
    typeof product.inStock === 'boolean'
  );
};

// Utility function to batch load products for better performance
export const loadProductsBatch = (products: Product[], page: number, pageSize: number = 20): Product[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return products.slice(startIndex, endIndex);
};

// Utility function to search products
export const searchProducts = (products: Product[], query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};