import { useState } from "react";
import { Link, useParams } from "react-router";
import type { Product, Size } from "../types";
import { PRODUCTS, getProduct } from "../data/products";
import { useCart } from "../context/useCart";
import { formatPrice } from "../lib/format";
import Swatch from "./Swatch";
import ProductCard from "./ProductCard";

export default function ProductPage() {
  const { id = "" } = useParams();
  const product = getProduct(id);

  if (!product) return <ProductNotFound />;
  // keyed so size selection resets when moving between products
  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { addItem, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addItem(product, selectedSize);
  };

  // same category first, then fill with the rest of the collection
  const related = [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category),
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  return (
    <>
      <title>{`${product.name} — Rhea`}</title>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="text-[11px] tracked text-stone mb-8 md:mb-12">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/#catalogue" className="hover:text-ink transition-colors">
                COLLECTION
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={`/?category=${encodeURIComponent(product.category)}#catalogue`} className="hover:text-ink transition-colors">
                {product.category.toUpperCase()}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink" aria-current="page">
              {product.name.toUpperCase()}
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7 fade-in">
            <div className="aspect-3/4 w-full overflow-hidden">
              <Swatch hex={product.hex} name={product.name} src={product.imageLarge} />
            </div>
          </div>

          <div className="md:col-span-5 md:sticky md:top-28 self-start fade-in">
            <p className="text-xs tracked text-oxblood mb-4">{product.category.toUpperCase()}</p>
            <h1 className="font-serif font-light text-4xl md:text-5xl leading-tight mb-4">{product.name}</h1>
            <p className="text-lg mb-6">{formatPrice(product.price)}</p>
            <p className="text-stone text-sm leading-relaxed mb-10">{product.desc}</p>

            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <p id="size-label" className="text-[11px] tracked text-stone">
                  SIZE{selectedSize && <span className="text-ink"> — {selectedSize}</span>}
                </p>
                {showSizeError && !selectedSize && (
                  <p role="alert" className="text-[11px] tracked text-oxblood">
                    PLEASE SELECT A SIZE
                  </p>
                )}
              </div>
              <div role="group" aria-labelledby="size-label" className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={selectedSize === s}
                    className={`min-w-12 text-xs tracked indent-[0.22em] px-3 py-3 border transition-colors ${
                      selectedSize === s ? "bg-ink text-bone border-ink" : "border-line text-stone hover:border-ink hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-ink text-bone text-xs tracked py-4 hover:bg-oxblood transition-colors mb-3"
            >
              ADD TO BAG — {formatPrice(product.price)}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="w-full border border-line text-xs tracked py-4 text-stone hover:border-ink hover:text-ink transition-colors mb-10"
            >
              VIEW BAG
            </button>

            <div className="border-t border-line">
              <details className="group border-b border-line" open>
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none text-[11px] tracked">
                  DETAILS &amp; CARE
                  <span className="text-stone transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="pb-5 space-y-2 text-sm text-stone">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </details>
              <details className="group border-b border-line">
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none text-[11px] tracked">
                  SHIPPING &amp; RETURNS
                  <span className="text-stone transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-sm text-stone leading-relaxed">
                  Complimentary express shipping on every order, delivered in 3–5 business days. Returns are accepted
                  within 30 days in original condition, with a prepaid label included in the box.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl">You may also like</h2>
            <Link
              to="/#catalogue"
              className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductNotFound() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 text-center">
      <title>Not found — Rhea</title>
      <p className="text-xs tracked text-oxblood mb-5">404</p>
      <h1 className="font-serif text-4xl mb-4">This piece isn't in the collection.</h1>
      <p className="text-stone text-sm mb-8">It may have been retired, or the link is mistyped.</p>
      <Link
        to="/#catalogue"
        className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
      >
        BACK TO THE COLLECTION
      </Link>
    </section>
  );
}
