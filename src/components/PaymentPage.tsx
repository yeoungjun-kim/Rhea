import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import type { CartItem } from "../types";
import { useCart } from "../context/useCart";
import { formatPrice } from "../lib/format";

interface PlacedOrder {
  number: string;
  items: CartItem[];
  subtotal: number;
}

const digits = (v: string) => v.replace(/\D/g, "");
const formatCardNumber = (v: string) => digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const formatExpiry = (v: string) => {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

const inputClass = "w-full border border-line px-3 py-3 text-sm bg-transparent focus:outline-none focus:border-ink";
const labelClass = "block text-[11px] tracked text-stone mb-2";

export default function PaymentPage() {
  const { items, subtotal, clearCart, setIsOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });

  const backToBag = () => {
    // go back to wherever the shopper opened checkout from; fall back to home on a direct visit
    if (location.key !== "default") navigate(-1);
    else navigate("/");
    setIsOpen(true);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder({ number: `RH-${Date.now().toString().slice(-6)}`, items, subtotal });
    clearCart();
    window.scrollTo(0, 0);
  };

  const logo = (
    <Link to="/" className="font-serif tracked-lg text-2xl">
      RHEA
    </Link>
  );

  if (order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <title>Order confirmed — Rhea</title>
        <div className="max-w-md w-full text-center fade-in">
          <div className="mb-12">{logo}</div>
          <p className="text-xs tracked text-oxblood mb-5">ORDER {order.number} CONFIRMED</p>
          <h1 className="font-serif text-4xl mb-5">Thank you.</h1>
          <p className="text-stone text-sm leading-relaxed mb-8">
            This is a mockup checkout — no payment was actually processed. Your order would arrive in 3–5 business
            days.
          </p>
          <ul className="text-left border-y border-line py-5 mb-8 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.id + item.size} className="flex justify-between gap-4">
                <span>
                  {item.name} <span className="text-stone">· {item.size} · ×{item.qty}</span>
                </span>
                <span className="whitespace-nowrap">{formatPrice(item.price * item.qty)}</span>
              </li>
            ))}
            <li className="flex justify-between pt-3 mt-3 border-t border-line">
              <span className="text-stone">Total</span>
              <span>{formatPrice(order.subtotal)}</span>
            </li>
          </ul>
          <Link
            to="/"
            className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
          >
            BACK TO THE COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <title>Checkout — Rhea</title>
        <div className="max-w-md text-center fade-in">
          <div className="mb-12">{logo}</div>
          <h1 className="font-serif text-4xl mb-5">Your bag is empty.</h1>
          <p className="text-stone text-sm mb-8">Add a piece or two before checking out.</p>
          <Link
            to="/#catalogue"
            className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
          >
            BROWSE THE COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-10 py-10">
      <title>Checkout — Rhea</title>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button onClick={backToBag} className="text-xs tracked text-stone hover:text-ink transition-colors">
            ← BACK TO BAG
          </button>
          {logo}
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-xs tracked text-oxblood mb-3">MOCK CHECKOUT</p>
            <h1 className="font-serif text-3xl mb-8">Payment details</h1>

            <form onSubmit={handlePay} className="space-y-5 max-w-md">
              <div>
                <label htmlFor="cc-name" className={labelClass}>
                  CARDHOLDER NAME
                </label>
                <input
                  id="cc-name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cc-number" className={labelClass}>
                  CARD NUMBER
                </label>
                <input
                  id="cc-number"
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  pattern="(\d{4} ){3}\d{4}"
                  title="16-digit card number"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="cc-exp" className={labelClass}>
                    EXPIRY
                  </label>
                  <input
                    id="cc-exp"
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="MM / YY"
                    pattern="(0[1-9]|1[0-2]) / \d{2}"
                    title="Month and year, e.g. 08 / 29"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cc-cvc" className={labelClass}>
                    CVC
                  </label>
                  <input
                    id="cc-cvc"
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="123"
                    pattern="\d{3,4}"
                    title="3 or 4 digits"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: digits(e.target.value).slice(0, 4) })}
                    className={inputClass}
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
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stone">Shipping</span>
              <span>Complimentary</span>
            </div>
            <p className="text-[11px] text-stone mt-3">Taxes calculated at the next step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
