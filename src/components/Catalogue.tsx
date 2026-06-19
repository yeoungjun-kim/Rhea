import { useMemo, useState } from "react";
import type { Size } from "../types";
import { PRODUCTS, PRICE_BANDS } from "../data/products";
import Filters, { type SortOption } from "./Filters";
import ProductCard from "./ProductCard";

export default function Catalogue() {
  const [category, setCategory] = useState("All");
  const [priceBand, setPriceBand] = useState(PRICE_BANDS[0].label);
  const [size, setSize] = useState<Size | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.label === priceBand)!;
    let list = PRODUCTS.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSize = size === "All" || p.sizes.includes(size);
      const matchPrice = p.price >= band.min && p.price <= band.max;
      return matchCategory && matchSize && matchPrice;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, priceBand, size, sortBy]);

  return (
    <section id="catalogue" className="pb-24">
      <Filters
        category={category}
        setCategory={setCategory}
        priceBand={priceBand}
        setPriceBand={setPriceBand}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filtered.length}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl mb-2">Nothing matches, yet.</p>
            <p className="text-stone text-sm">Try clearing a filter to see more of the collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
