import type { Product, PriceBand, Size } from "../types";

const crop = (base: string, w = 800, h = 1000) => `${base}?fm=jpg&q=80&w=${w}&h=${h}&fit=crop&auto=format`;

type ProductSeed = Omit<Product, "image" | "imageLarge"> & { photo: string };

const SEEDS: ProductSeed[] = [
  {
    id: "p1", name: "Silk Column Gown", category: "Gowns", price: 2480, sizes: ["XS", "S", "M", "L"], hex: "#cfc6b3",
    photo: "https://images.unsplash.com/photo-1763029803944-648ed8638219",
    desc: "Bias-cut silk charmeuse, hand-finished hem.",
    details: ["100% silk charmeuse", "Bias cut, floor length", "Hand-rolled hem", "Made in Italy", "Dry clean only"],
  },
  {
    id: "p2", name: "Wool Tailored Coat", category: "Outerwear", price: 1860, sizes: ["S", "M", "L", "XL"], hex: "#3a342c",
    photo: "https://images.unsplash.com/photo-1545885785-910f3bbf07a8",
    desc: "Double-faced wool, horn buttons.",
    details: ["100% double-faced virgin wool", "Genuine horn buttons", "Unlined, hand-finished seams", "Made in Portugal", "Dry clean only"],
  },
  {
    id: "p3", name: "Cashmere Knit Set", category: "Knitwear", price: 1240, sizes: ["XS", "S", "M"], hex: "#b9a98c",
    photo: "https://images.unsplash.com/photo-1589572597185-498c5ea0a731",
    desc: "Two-ply cashmere, raglan sleeve.",
    details: ["100% two-ply Mongolian cashmere", "Raglan sleeve, relaxed fit", "Sweater and wide-leg pant", "Made in Scotland", "Hand wash cold, dry flat"],
  },
  {
    id: "p4", name: "Leather Sheath Dress", category: "Dresses", price: 2190, sizes: ["S", "M", "L"], hex: "#1c1815",
    photo: "https://images.unsplash.com/photo-1556121017-bc6f100e2b4a",
    desc: "Nappa leather, exposed back seam.",
    details: ["100% lambskin nappa leather", "Silk lining", "Concealed back zip", "Made in Italy", "Specialist leather clean"],
  },
  {
    id: "p5", name: "Linen Wide Trouser", category: "Trousers", price: 690, sizes: ["XS", "S", "M", "L"], hex: "#ddd2bd",
    photo: "https://images.unsplash.com/photo-1774005906344-57048d3f5856",
    desc: "Heavyweight linen, pressed pleat.",
    details: ["100% heavyweight Belgian linen", "High rise, pressed front pleat", "Side slip pockets", "Made in Portugal", "Machine wash cold"],
  },
  {
    id: "p6", name: "Satin Slip Dress", category: "Dresses", price: 980, sizes: ["XS", "S", "M", "L"], hex: "#8c7d6b",
    photo: "https://images.unsplash.com/photo-1543583869-c9da01598801",
    desc: "Bias-cut satin, adjustable strap.",
    details: ["100% silk satin", "Bias cut, midi length", "Adjustable spaghetti straps", "Made in Italy", "Dry clean only"],
  },
  {
    id: "p7", name: "Structured Blazer", category: "Outerwear", price: 1450, sizes: ["S", "M", "L", "XL"], hex: "#272220",
    photo: "https://plus.unsplash.com/premium_photo-1690034979506-cf086f51bd58",
    desc: "Tropical wool, peak lapel.",
    details: ["100% tropical-weight wool", "Peak lapel, single button", "Cupro lining", "Made in Italy", "Dry clean only"],
  },
  {
    id: "p8", name: "Merino Turtleneck", category: "Knitwear", price: 540, sizes: ["XS", "S", "M", "L"], hex: "#a99c87",
    photo: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e",
    desc: "Fine-gauge merino, ribbed cuff.",
    details: ["100% extra-fine merino wool", "Fine 16-gauge knit", "Ribbed collar and cuffs", "Made in Italy", "Hand wash cold, dry flat"],
  },
  {
    id: "p9", name: "Pleated Midi Skirt", category: "Skirts", price: 760, sizes: ["XS", "S", "M"], hex: "#4b423a",
    photo: "https://images.unsplash.com/photo-1497920261388-9c5866b65061",
    desc: "Sunray pleat, satin-back crepe.",
    details: ["100% polyester satin-back crepe", "Permanent sunray pleats", "Elasticated back waist", "Made in France", "Cool iron, do not press pleats"],
  },
  {
    id: "p10", name: "Velvet Evening Gown", category: "Gowns", price: 3120, sizes: ["S", "M", "L"], hex: "#2e1b1f",
    photo: "https://plus.unsplash.com/premium_photo-1757623255470-5c43b9842065",
    desc: "Silk velvet, hand-draped cowl.",
    details: ["Silk and viscose velvet", "Hand-draped cowl neckline", "Floor length with train", "Made in France", "Dry clean only"],
  },
  {
    id: "p11", name: "Shearling Jacket", category: "Outerwear", price: 2760, sizes: ["XS", "S", "M", "L"], hex: "#c9b89a",
    photo: "https://images.unsplash.com/photo-1613498382159-0972b7b4c9f1",
    desc: "Spanish shearling, raw edge.",
    details: ["100% Spanish merino shearling", "Raw-cut edges", "Horn toggle closure", "Made in Spain", "Specialist leather clean"],
  },
  {
    id: "p12", name: "Crepe Wrap Dress", category: "Dresses", price: 890, sizes: ["XS", "S", "M", "L", "XL"], hex: "#6b5847",
    photo: "https://images.unsplash.com/photo-1621190827235-9b2217498413",
    desc: "Matte crepe, self-tie waist.",
    details: ["Triacetate and polyester matte crepe", "Wrap front, self-tie waist", "Three-quarter sleeve", "Made in Portugal", "Dry clean only"],
  },
];

export const PRODUCTS: Product[] = SEEDS.map(({ photo, ...rest }) => ({
  ...rest,
  image: crop(photo),
  imageLarge: crop(photo, 1200, 1500),
}));

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES: string[] = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

// min inclusive, max exclusive, so every price lands in exactly one band
export const PRICE_BANDS: PriceBand[] = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000–$2,000", min: 1000, max: 2000 },
  { label: "$2,000+", min: 2000, max: Infinity },
];

export const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];
