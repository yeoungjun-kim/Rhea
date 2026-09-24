import { createContext, useContext } from "react";
import type { CartItem, Product, Size } from "../types";

export interface ToastState {
  id: number;
  message: string;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size: Size) => void;
  removeItem: (id: string, size: Size) => void;
  updateQty: (id: string, size: Size, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toast: ToastState | null;
  dismissToast: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
