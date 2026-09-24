import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/useCart";

const NAV_LINKS = [
  { to: "/#catalogue", label: "Collection" },
  { to: "/#about", label: "Atelier" },
  { to: "/#footer", label: "Contact" },
];

export default function Header() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-bone/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-serif tracked-lg text-2xl md:text-3xl" onClick={() => setMenuOpen(false)}>
          RHEA
        </Link>
        <nav className="hidden md:flex gap-10 text-xs tracked text-stone">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-xs tracked border border-ink/20 px-4 py-2 hover:bg-ink hover:text-bone transition-colors"
            aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            BAG
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] tracking-normal leading-none bg-oxblood text-bone rounded-full px-1">
              {count}
            </span>
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 flex-shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-ink transition-transform duration-200 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-transform duration-200 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-line px-6 py-6 flex flex-col gap-5 text-xs tracked text-stone fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-ink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
