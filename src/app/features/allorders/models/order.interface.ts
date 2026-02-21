export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string; // category id
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Product {
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string; // same as _id but provided separately
  }
  
  export interface CartItem {
    count: number;
    product: Product;
    price: number;
    _id: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export type PaymentMethodType = 'cash' | 'card';
  
  export interface Order {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: PaymentMethodType;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    cartItems: CartItem[];
    createdAt: string;  // ISO string
    updatedAt: string;  // ISO string
    id: number;         // sample shows "1"
    __v: number;
  }  