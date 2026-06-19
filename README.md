# Rhea — Luxury Fashion E-Commerce Platform

A luxury fashion storefront built with React, TypeScript, Tailwind CSS, and the Context API.

## Features
- Responsive product catalogue with filtering by category, size, and price
- Sorting by price
- Persistent shopping cart (in-memory, via React Context) with quantity controls and live subtotal
- Typography-driven, whitespace-first UI inspired by luxury retail design

## Stack
React 18 · TypeScript · Tailwind CSS 4 · Vite

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
  context/          CartContext — cart state via React Context API
  data/             Product catalogue and filter constants
  types/            Shared TypeScript types
  lib/              Small formatting helpers
  index.css         Tailwind import + design tokens (theme colors, fonts)
  App.tsx           Composes the page from components
  main.tsx          React entry point
```

## Notes
- Cart state lives in memory (React state via Context), so it resets on page reload by design — no browser storage is used.
- Product imagery is represented with generated fabric-texture color swatches; swap `Swatch` usages for real `<img>` tags once you have photography.
