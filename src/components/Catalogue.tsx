import { useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Size } from "../types";
import { PRODUCTS, PRICE_BANDS, CATEGORIES, ALL_SIZES } from "../data/products";
import Filters, { type SortOption } from "./Filters";
import ProductCard from "./ProductCard";

const SORT_OPTIONS: SortOption[] = ["featured", "price-asc", "price-desc"];

export default function Catalogue() {
  // filters live in the URL so they survive visiting a product and coming back
  const [params, setParams] = useSearchParams();

  const pick = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
    const v = params.get(key);
    return v !== null && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
  };

  const category = pick("category", CATEGORIES, "All");
  const priceBand = pick("price", PRICE_BANDS.map((b) => b.label), PRICE_BANDS[0].label);
  const size = pick<Size | "All">("size", ["All", ...ALL_SIZES], "All");
  const sortBy = pick("sort", SORT_OPTIONS, "featured");

  const setParam = (key: string, value: string, defaultValue: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true }
    );
  };

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.label === priceBand)!;
    let list = PRODUCTS.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSize = size === "All" || p.sizes.includes(size);
      const matchPrice = p.price >= band.min && p.price < band.max;
      return matchCategory && matchSize && matchPrice;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, priceBand, size, sortBy]);

  return (
    <section id="catalogue" className="pb-24 scroll-mt-24">
      <Filters
        category={category}
        setCategory={(c) => setParam("category", c, "All")}
        priceBand={priceBand}
        setPriceBand={(p) => setParam("price", p, PRICE_BANDS[0].label)}
        size={size}
        setSize={(s) => setParam("size", s, "All")}
        sortBy={sortBy}
        setSortBy={(s) => setParam("sort", s, "featured")}
        resultCount={filtered.length}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl mb-2">Nothing matches, yet.</p>
            <p className="text-stone text-sm mb-6">Try clearing a filter to see more of the collection.</p>
            <button
              onClick={() => setParams({}, { replace: true, preventScrollReset: true })}
              className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
            >
              CLEAR ALL FILTERS
            </button>
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
