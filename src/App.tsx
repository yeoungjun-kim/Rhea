import { createBrowserRouter, Link, Outlet, RouterProvider, ScrollRestoration } from "react-router";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import PaymentPage from "./components/PaymentPage";
import ProductPage from "./components/ProductPage";

function Root() {
  return (
    <>
      {/* new pages open at the top, back/forward restores position, /#hash links scroll to the section */}
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

function StoreLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}

function HomePage() {
  return (
    <>
      <title>Rhea — Luxury Fashion</title>
      <Hero />
      <Catalogue />
      <About />
    </>
  );
}

function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 text-center">
      <title>Not found — Rhea</title>
      <p className="text-xs tracked text-oxblood mb-5">404</p>
      <h1 className="font-serif text-4xl mb-8">This page doesn't exist.</h1>
      <Link to="/" className="text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors">
        BACK TO THE COLLECTION
      </Link>
    </section>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <StoreLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/product/:id", element: <ProductPage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "/checkout", element: <PaymentPage /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
