export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
  }
  
  export interface SaleLine {
    productId: string;
    qty: number;
    price: number; // unit price at time of sale
  }
  
  export interface Sale {
    id: string;
    items: SaleLine[];
    total: number;
    createdAt: string; // ISO date
  }