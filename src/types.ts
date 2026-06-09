export type Category = 'maquinaria' | 'semillas' | 'fertilizantes' | 'herramientas' | 'tecnologia';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  fullDescription: string;
  price: number | 'consultar'; // Some heavy machines have custom quotes
  imageUrl: string;
  badges: string[];
  specs: {
    label: string;
    value: string;
  }[];
  stock: number;
  rating: number;
  reviewsCount: number;
  unit: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FarmerInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  cropType: string;
  location: string;
  message: string;
  products: { productId: string; name: string; quantity: number }[];
  status: 'pending' | 'responded';
  createdAt: string;
}

export interface ConsultationMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedProducts?: string[]; // list of product IDs
  timestamp: string;
}
