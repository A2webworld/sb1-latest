export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}