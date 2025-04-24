import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import { ThemeProvider } from "./contexts/ThemeContext"

// Layout components
import MainLayout from "./layouts/MainLayout"

// Pages
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="producto/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
