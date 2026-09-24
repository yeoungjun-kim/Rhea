import { useState } from "react";
import { Link } from "react-router";
import type { Product, Size } from "../types";
import { useCart } from "../context/useCart";
import { formatPrice } from "../lib/format";
import Swatch from "./Swatch";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const href = `/product/${product.id}`;

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
  };

  return (
    <div className="group fade-in">
      <div className="aspect-3/4 w-full overflow-hidden relative mb-4">
        {/* duplicate of the text link below, so it's hidden from tab order */}
        <Link to={href} tabIndex={-1} aria-hidden="true" className="block w-full h-full">
          <Swatch hex={product.hex} name={product.name} src={product.image} className="transition-transform duration-700 group-hover:scale-105" />
        </Link>
        {/* quick add: appears on hover (pointer devices) or when anything in the card has keyboard focus */}
        <div
          className="absolute inset-x-0 bottom-0 bg-bone/95 backdrop-blur px-4 py-3 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto"
        >
          <div className="flex flex-wrap gap-2 mb-2" role="group" aria-label={`Quick add ${product.name}: choose size`}>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                aria-pressed={selectedSize === s}
                className={`text-[10px] tracked indent-[0.22em] px-2 py-1 border transition-colors ${
                  selectedSize === s ? "bg-ink text-bone border-ink" : "border-line text-stone hover:border-ink hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full text-[11px] tracked py-2 transition-colors ${
              selectedSize ? "bg-oxblood text-bone hover:bg-oxblood-dark" : "bg-line text-stone cursor-not-allowed"
            }`}
          >
            {selectedSize ? "ADD TO BAG" : "SELECT SIZE"}
          </button>
        </div>
      </div>
      <Link to={href} className="block focus:outline-none focus-visible:underline decoration-line underline-offset-4">
        <p className="text-[10px] tracked text-stone mb-1">{product.category.toUpperCase()}</p>
        <h3 className="font-serif text-lg leading-tight mb-1 group-hover:text-oxblood transition-colors">{product.name}</h3>
        <p className="text-sm text-stone">{formatPrice(product.price)}</p>
      </Link>
    </div>
  );
}
