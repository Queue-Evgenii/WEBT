export class Product {
  id: number;
  name: string;
  price: number;
  preview: string;
  category_id: number;
  category_name: string;
  description: string;
}

export class Commodity extends Product {
  text: string;
  stock: number;
}

export class CartProduct extends Product {
  quantity: number;
  stock: number;
}

export interface CartItem {
  id: number;
  quantity: number;
}