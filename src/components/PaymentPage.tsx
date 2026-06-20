import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";

export default function PaymentPage() {
  const { items, subtotal, backToStore } = useCart();
  const [isComplete, setIsComplete] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center fade-in">
          <p className="text-xs tracked text-oxblood mb-5">ORDER CONFIRMED</p>
          <h1 className="font-serif text-4xl mb-5">Thank you.</h1>
          <p className="text-stone text-sm leading-relaxed mb-8">
            This is a mockup checkout — no payment was actually processed. Your order would arrive in 3–5 business
            days.
          </p>
          <button
            onClick={backToStore}
            className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
          >
            BACK TO THE COLLECTION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={backToStore}
          className="text-xs tracked text-stone hover:text-ink transition-colors mb-10"
        >
          ← BACK TO BAG
        </button>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-xs tracked text-oxblood mb-3">MOCK CHECKOUT</p>
            <h1 className="font-serif text-3xl mb-8">Payment details</h1>

            <form onSubmit={handlePay} className="space-y-5 max-w-md">
              <div>
                <label className="block text-[11px] tracked text-stone mb-2">CARDHOLDER NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full border border-line px-3 py-3 text-sm bg-transparent focus:outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-[11px] tracked text-stone mb-2">CARD NUMBER</label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="w-full border border-line px-3 py-3 text-sm bg-transparent focus:outline-none focus:border-ink"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] tracked text-stone mb-2">EXPIRY</label>
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    className="w-full border border-line px-3 py-3 text-sm bg-transparent focus:outline-none focus:border-ink"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] tracked text-stone mb-2">CVC</label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="123"
                    className="w-full border border-line px-3 py-3 text-sm bg-transparent focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-ink text-bone text-xs tracked py-4 hover:bg-oxblood transition-colors mt-4"
              >
                PAY {formatPrice(subtotal)}
              </button>
              <p className="text-[11px] text-stone text-center">
                This is a demo form. No real payment will be processed.
              </p>
            </form>
          </div>

          <div className="md:col-span-5">
            <p className="text-xs tracked text-stone mb-4">ORDER SUMMARY</p>
            <ul className="space-y-4 border-b border-line pb-6 mb-6">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-18 object-cover flex-shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="flex-1 flex justify-between gap-2">
                    <div>
                      <p className="font-serif text-sm leading-tight">{item.name}</p>
                      <p className="text-xs text-stone mt-1">
                        Size {item.size} · Qty {item.qty}
                      </p>
                    </div>
                    <p className="text-sm whitespace-nowrap">{formatPrice(item.price * item.qty)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stone">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-stone">Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
