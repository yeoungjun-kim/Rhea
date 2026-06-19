import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import Swatch from "./Swatch";

export default function CartDrawer() {
  const { items, removeItem, updateQty, subtotal, isOpen, setIsOpen } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={() => setIsOpen(false)} />
      <div className="drawer-enter relative w-full max-w-md h-full bg-bone flex flex-col border-l border-line">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-serif tracked text-xl">YOUR BAG</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="text-stone hover:text-ink text-xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
          {items.length === 0 ? (
            <p className="text-stone text-sm py-10 text-center">Your bag is empty. The collection is waiting.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex gap-4 pb-6 border-b border-line">
                  <div className="w-20 h-24 flex-shrink-0">
                    <Swatch hex={item.hex} name={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-serif text-base leading-tight">{item.name}</h3>
                      <p className="text-sm whitespace-nowrap">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <p className="text-xs text-stone mt-1">Size {item.size}</p>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          className="w-7 h-7 text-stone hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          className="w-7 h-7 text-stone hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-[11px] tracked text-stone hover:text-oxblood"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-line">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stone">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-stone mb-5">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-ink text-bone text-xs tracked py-4 hover:bg-oxblood transition-colors">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
