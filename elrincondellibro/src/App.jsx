import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import { ThemeProvider } from "./contexts/ThemeContext"

// Layout components
import MainLayout from "./layouts/MainLayout"

// Pages
import HomePage from "./pages/HomePage"
import BooksPage from "./pages/BooksPage"
import ComicsPage from "./pages/ComicsPage"
import MangaPage from "./pages/MangaPage"
import AudiobooksPage from "./pages/AudiobooksPage"
import EventsPage from "./pages/EventsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="libros" element={<BooksPage />} />
              <Route path="comics" element={<ComicsPage />} />
              <Route path="manga" element={<MangaPage />} />
              <Route path="audiolibros" element={<AudiobooksPage />} />
              <Route path="eventos" element={<EventsPage />} />
              <Route path="producto/:id" element={<ProductDetailPage />} />
              <Route path="carrito" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="registro" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
