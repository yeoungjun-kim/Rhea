import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product, Size } from "../types";
import { ALL_SIZES } from "../data/products";
import { CartContext } from "./useCart";
import type { CartContextValue, ToastState } from "./useCart";

const STORAGE_KEY = "rhea-cart";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.price === "number" &&
    typeof v.hex === "string" &&
    typeof v.image === "string" &&
    typeof v.qty === "number" &&
    v.qty > 0 &&
    ALL_SIZES.includes(v.size as Size)
  );
}

function loadStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // drop anything malformed or left over from an older cart shape
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadStoredItems);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode, quota exceeded) — cart just won't persist
    }
  }, [items]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const addItem = useCallback(
    (product: Product, size: Size) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id && i.size === size);
        if (existing) {
          return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { id: product.id, name: product.name, price: product.price, size, hex: product.hex, image: product.image, qty: 1 }];
      });
      showToast(`${product.name} added to bag`);
    },
    [showToast]
  );

  const removeItem = useCallback((id: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback((id: string, size: Size, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      subtotal,
      count,
      isOpen,
      setIsOpen,
      toast,
      dismissToast,
    }),
    [items, addItem, removeItem, updateQty, clearCart, subtotal, count, isOpen, toast, dismissToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
