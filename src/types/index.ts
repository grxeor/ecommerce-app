export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  urlImage: string;
  quantity?: number;
}