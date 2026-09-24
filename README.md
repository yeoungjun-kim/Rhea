# Rhea — Luxury Fashion E-Commerce Platform

A luxury fashion storefront built with React, TypeScript, Tailwind CSS, and the Context API.

## Features
- Responsive product catalogue with filtering by category, size, and price, plus sorting — filters are kept in the URL, so they survive navigating away and back
- Product detail pages at `/product/:id` with size selection, details & care, and related pieces
- Quick add-to-bag from the catalogue (hover, or keyboard focus)
- Shopping cart drawer with quantity controls and live subtotal, persisted to `localStorage`
- Mock checkout at `/checkout` with an order confirmation
- Typography-driven, whitespace-first UI inspired by luxury retail design

## Stack
React 19 · React Router 7 · TypeScript · Tailwind CSS 4 · Vite

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/      UI components (Header, Hero, Catalogue, ProductCard, CartDrawer, etc.)
  context/          CartProvider (CartContext.tsx) and the useCart hook (useCart.ts)
  data/             Product catalogue and filter constants
  types/            Shared TypeScript types
  lib/              Small formatting helpers
  index.css         Tailwind import + design tokens (theme colors, fonts)
  App.tsx           Routes: / (home), /product/:id, /checkout
  main.tsx          React entry point
```

## Notes
- The cart is saved to `localStorage` under `rhea-cart`; it's cleared after a (mock) order is placed.
- Product photos come from Unsplash; each product's `hex` color shows while the image loads.
- Routing uses browser history URLs. When deploying, configure the host to serve `index.html` for unknown paths (SPA fallback) so links like `/product/p3` work on refresh.
