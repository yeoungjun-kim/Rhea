import { useState } from "react";
import type { Product, Size } from "../types";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import Swatch from "./Swatch";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
  };

  return (
    <div className="group fade-in" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="aspect-3/4 w-full overflow-hidden relative mb-4">
        <Swatch hex={product.hex} name={product.name} src={product.image} className="transition-transform duration-700 group-hover:scale-105" />
        <div
          className={`absolute inset-x-0 bottom-0 bg-bone/95 backdrop-blur px-4 py-3 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-[10px] tracked px-2 py-1 border transition-colors ${
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
      <p className="text-[10px] tracked text-stone mb-1">{product.category.toUpperCase()}</p>
      <h3 className="font-serif text-lg leading-tight mb-1">{product.name}</h3>
      <p className="text-sm text-stone">{formatPrice(product.price)}</p>
    </div>
  );
}
