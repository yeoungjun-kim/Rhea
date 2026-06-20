export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: Size[];
  hex: string;
  image: string;
  desc: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: Size;
  hex: string;
  image: string;
  qty: number;
}

export interface PriceBand {
  label: string;
  min: number;
  max: number;
}
