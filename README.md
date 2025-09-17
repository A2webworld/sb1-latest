# AlMUJIB SUPERMARKET - E-commerce Website

## Adding Your 800 Products

There are several ways to add your products to the website:

### Method 1: Direct Array Replacement (Recommended for smaller datasets)

1. Open `src/data/products.ts`
2. Replace the existing products array with your products following this format:

```typescript
export const products: Product[] = [
  {
    id: 'unique-product-id-1',
    name: 'Your Product Name',
    price: 12.99,
    originalPrice: 15.99, // optional - for sale items
    image: 'https://your-image-url.com/product.jpg',
    category: 'condiments-seasonings', // must match category IDs
    rating: 4.5,
    reviews: 123,
    description: 'Detailed product description',
    inStock: true,
    isNew: false, // optional
    isOnSale: true, // optional
    nutritionInfo: { // optional - for food items
      calories: 100,
      protein: '5g',
      carbs: '20g',
      fat: '2g'
    }
  },
  // ... add all 800 products
];
```

### Method 2: JSON File Loading (Recommended for large datasets)

1. Create a `products.json` file in the `public` folder with your products
2. Use the `useProducts` hook with JSON loading:

```typescript
// In your component
const { products, loading, error } = useProducts(true, '/products.json');
```

### Method 3: API Integration

For dynamic product loading from your backend:

```typescript
// Modify src/utils/productLoader.ts
export const loadProductsFromAPI = async (apiUrl: string): Promise<Product[]> => {
  const response = await fetch(apiUrl);
  return response.json();
};
```

## Product Categories

Make sure your products use these category IDs:
- `condiments-seasonings`
- `cooking-oils`
- `grains-flours`
- `vegetables`
- `proteins-poultry`
- `snacks-treats`
- `drinks-beverages`
- `household-items`
- `beauty-personal-care`

## Image Requirements

- Use high-quality product images (minimum 400x400px)
- Ensure images are optimized for web (WebP or JPEG)
- Use consistent aspect ratios for better layout
- Consider using a CDN for better performance

## Performance Optimization

The website includes:
- Pagination (20 products per page)
- Lazy loading for images
- Efficient filtering and sorting
- Search functionality with debouncing

## Getting Started

1. Replace the sample products with your data
2. Update product images with your actual product photos
3. Customize categories if needed
4. Test the website with your product data
5. Deploy to production

## Support

For technical support or customization needs, please refer to the documentation or contact support.