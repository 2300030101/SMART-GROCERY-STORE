
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  debt: number; // 'Katha' balance
  lastVisit: string;
}

export type PaymentMethod = 'cash' | 'online' | 'credit' | 'split';

export interface Transaction {
  id: string;
  date: string;
  items: CartItem[];
  customerId?: string;
  paymentMethod: PaymentMethod;
  
  // Financials
  subtotal: number;
  tax: number;
  discount: number;
  total: number;      // Final total after tax and discount
  amountPaid: number; // Amount collected immediately
}

export type Page = 'landing' | 'login' | 'signup' | 'store' | 'admin';

export interface User {
  username: string;
  password?: string;
  role: 'admin' | 'staff' | 'customer';
  name?: string;
  phone?: string;
}
