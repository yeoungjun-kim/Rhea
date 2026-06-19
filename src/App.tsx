import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <CartProvider>
      <Header />
      <Hero />
      <Catalogue />
      <About />
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

export default App;
