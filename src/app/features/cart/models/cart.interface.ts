export interface Cart {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    createdAt: string;  
    updatedAt: string;  
    __v: number;
    totalCartPrice: number;
}

export interface CartItem {
    _id: string;
    count: number;
    price: number;
    product: Product;
}

export interface Product {
    _id: string;
    id?: string; 
    title: string;
    quantity: number;
    imageCover: string;
    ratingsAverage: number;
    subcategory: Subcategory[];
    category: CategoryRef;
    brand: BrandRef;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string; 
}

export interface CategoryRef {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface BrandRef {
    _id: string;
    name: string;
    slug: string;
    image: string;
}  
