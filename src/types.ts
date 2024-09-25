// src/types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  pricePerUnit: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
