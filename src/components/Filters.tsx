import { CATEGORIES, PRICE_BANDS, ALL_SIZES } from "../data/products";
import type { Size } from "../types";

export type SortOption = "featured" | "price-asc" | "price-desc";

interface FiltersProps {
  category: string;
  setCategory: (c: string) => void;
  priceBand: string;
  setPriceBand: (p: string) => void;
  size: Size | "All";
  setSize: (s: Size | "All") => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  resultCount: number;
}

export default function Filters({
  category,
  setCategory,
  priceBand,
  setPriceBand,
  size,
  setSize,
  sortBy,
  setSortBy,
  resultCount,
}: FiltersProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-between border-y border-line py-5">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs tracked text-stone">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`pb-1 border-b transition-colors ${
                category === c ? "text-ink border-ink" : "border-transparent hover:text-ink"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as Size | "All")}
            className="bg-transparent border border-line px-3 py-2 tracked text-stone focus:outline-none focus:border-ink"
            aria-label="Filter by size"
          >
            <option value="All">SIZE</option>
            {ALL_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={priceBand}
            onChange={(e) => setPriceBand(e.target.value)}
            className="bg-transparent border border-line px-3 py-2 tracked text-stone focus:outline-none focus:border-ink"
            aria-label="Filter by price"
          >
            {PRICE_BANDS.map((b) => (
              <option key={b.label} value={b.label}>
                {b.label.toUpperCase()}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent border border-line px-3 py-2 tracked text-stone focus:outline-none focus:border-ink"
            aria-label="Sort products"
          >
            <option value="featured">FEATURED</option>
            <option value="price-asc">PRICE: LOW–HIGH</option>
            <option value="price-desc">PRICE: HIGH–LOW</option>
          </select>
        </div>
      </div>
      <p className="text-[11px] tracked text-stone mt-4">
        {resultCount} {resultCount === 1 ? "PIECE" : "PIECES"}
      </p>
    </div>
  );
}
