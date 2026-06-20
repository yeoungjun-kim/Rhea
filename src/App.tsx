import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import PaymentPage from "./components/PaymentPage";

function AppContent() {
  const { isCheckingOut } = useCart();

  if (isCheckingOut) {
    return <PaymentPage />;
  }

  return (
    <>
      <Header />
      <Hero />
      <Catalogue />
      <About />
      <Footer />
      <CartDrawer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
