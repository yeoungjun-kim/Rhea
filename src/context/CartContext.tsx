import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product, Size } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size: Size) => void;
  removeItem: (id: string, size: Size) => void;
  updateQty: (id: string, size: Size, qty: number) => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, size: Size) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, size, hex: product.hex, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQty = (id: string, size: Size, qty: number) => {
    if (qty <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)));
  };

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value: CartContextValue = { items, addItem, removeItem, updateQty, subtotal, count, isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
