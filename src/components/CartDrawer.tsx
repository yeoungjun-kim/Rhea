import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useCart } from "../context/useCart";
import { formatPrice } from "../lib/format";
import Swatch from "./Swatch";

export default function CartDrawer() {
  const { items, removeItem, updateQty, subtotal, isOpen, setIsOpen } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      // keep Tab cycling inside the drawer while it's open
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const close = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="drawer-enter relative w-full max-w-md h-full bg-bone flex flex-col border-l border-line"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 id="cart-title" className="font-serif tracked text-xl">
            YOUR BAG
          </h2>
          <button ref={closeRef} onClick={close} aria-label="Close bag" className="text-stone hover:text-ink text-xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-stone text-sm mb-6">Your bag is empty. The collection is waiting.</p>
              <Link
                to="/#catalogue"
                onClick={close}
                className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
              >
                BROWSE THE COLLECTION
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex gap-4 pb-6 border-b border-line">
                  <Link to={`/product/${item.id}`} onClick={close} tabIndex={-1} aria-hidden="true" className="w-20 h-24 flex-shrink-0">
                    <Swatch hex={item.hex} name={item.name} src={item.image} />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${item.id}`} onClick={close} className="font-serif text-base leading-tight hover:text-oxblood transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-sm whitespace-nowrap">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <p className="text-xs text-stone mt-1">Size {item.size}</p>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          className="w-7 h-7 text-stone hover:text-ink"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          className="w-7 h-7 text-stone hover:text-ink"
                          aria-label={`Increase quantity of ${item.name}`}
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
            <p className="text-[11px] text-stone mb-5">Complimentary shipping. Taxes calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={close}
              className="block text-center w-full bg-ink text-bone text-xs tracked py-4 hover:bg-oxblood transition-colors"
            >
              CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
