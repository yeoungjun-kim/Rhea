import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-bone/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="font-serif tracked-lg text-2xl md:text-3xl">
          RHEA
        </a>
        <nav className="hidden md:flex gap-10 text-xs tracked text-stone">
          <a href="#catalogue" className="hover:text-ink transition-colors">
            Collection
          </a>
          <a href="#about" className="hover:text-ink transition-colors">
            Atelier
          </a>
          <a href="#footer" className="hover:text-ink transition-colors">
            Contact
          </a>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-xs tracked border border-ink/20 px-4 py-2 hover:bg-ink hover:text-bone transition-colors"
          aria-label="Open cart"
        >
          BAG
          <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] bg-oxblood text-bone rounded-full px-1">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
