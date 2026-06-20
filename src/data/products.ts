import type { Product, PriceBand, Size } from "../types";

const crop = (base: string) => `${base}?fm=jpg&q=80&w=800&h=1000&fit=crop&auto=format`;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Silk Column Gown", category: "Gowns", price: 2480, sizes: ["XS", "S", "M", "L"], hex: "#cfc6b3", image: crop("https://images.unsplash.com/photo-1763029803944-648ed8638219"), desc: "Bias-cut silk charmeuse, hand-finished hem." },
  { id: "p2", name: "Wool Tailored Coat", category: "Outerwear", price: 1860, sizes: ["S", "M", "L", "XL"], hex: "#3a342c", image: crop("https://images.unsplash.com/photo-1545885785-910f3bbf07a8"), desc: "Double-faced wool, horn buttons." },
  { id: "p3", name: "Cashmere Knit Set", category: "Knitwear", price: 1240, sizes: ["XS", "S", "M"], hex: "#b9a98c", image: crop("https://images.unsplash.com/photo-1589572597185-498c5ea0a731"), desc: "Two-ply cashmere, raglan sleeve." },
  { id: "p4", name: "Leather Sheath Dress", category: "Dresses", price: 2190, sizes: ["S", "M", "L"], hex: "#1c1815", image: crop("https://images.unsplash.com/photo-1556121017-bc6f100e2b4a"), desc: "Nappa leather, exposed back seam." },
  { id: "p5", name: "Linen Wide Trouser", category: "Trousers", price: 690, sizes: ["XS", "S", "M", "L"], hex: "#ddd2bd", image: crop("https://images.unsplash.com/photo-1774005906344-57048d3f5856"), desc: "Heavyweight linen, pressed pleat." },
  { id: "p6", name: "Satin Slip Dress", category: "Dresses", price: 980, sizes: ["XS", "S", "M", "L"], hex: "#8c7d6b", image: crop("https://images.unsplash.com/photo-1543583869-c9da01598801"), desc: "Bias-cut satin, adjustable strap." },
  { id: "p7", name: "Structured Blazer", category: "Outerwear", price: 1450, sizes: ["S", "M", "L", "XL"], hex: "#272220", image: crop("https://plus.unsplash.com/premium_photo-1690034979506-cf086f51bd58"), desc: "Tropical wool, peak lapel." },
  { id: "p8", name: "Merino Turtleneck", category: "Knitwear", price: 540, sizes: ["XS", "S", "M", "L"], hex: "#a99c87", image: crop("https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e"), desc: "Fine-gauge merino, ribbed cuff." },
  { id: "p9", name: "Pleated Midi Skirt", category: "Trousers", price: 760, sizes: ["XS", "S", "M"], hex: "#4b423a", image: crop("https://images.unsplash.com/photo-1497920261388-9c5866b65061"), desc: "Sunray pleat, satin-back crepe." },
  { id: "p10", name: "Velvet Evening Gown", category: "Gowns", price: 3120, sizes: ["S", "M", "L"], hex: "#2e1b1f", image: crop("https://plus.unsplash.com/premium_photo-1757623255470-5c43b9842065"), desc: "Silk velvet, hand-draped cowl." },
  { id: "p11", name: "Shearling Jacket", category: "Outerwear", price: 2760, sizes: ["XS", "S", "M", "L"], hex: "#c9b89a", image: crop("https://images.unsplash.com/photo-1613498382159-0972b7b4c9f1"), desc: "Spanish shearling, raw edge." },
  { id: "p12", name: "Crepe Wrap Dress", category: "Dresses", price: 890, sizes: ["XS", "S", "M", "L", "XL"], hex: "#6b5847", image: crop("https://images.unsplash.com/photo-1621190827235-9b2217498413"), desc: "Matte crepe, self-tie waist." },
];

export const CATEGORIES: string[] = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export const PRICE_BANDS: PriceBand[] = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $1,000", min: 0, max: 999 },
  { label: "$1,000–$2,000", min: 1000, max: 2000 },
  { label: "$2,000+", min: 2001, max: Infinity },
];

export const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];
