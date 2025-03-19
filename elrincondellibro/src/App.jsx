"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Componentes de layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Páginas
import Home from "./pages/Home"
import Books from "./pages/Books"
import Comics from "./pages/Comics"
import Manga from "./pages/Manga"
import Audiobooks from "./pages/Audiobooks"
import Events from "./pages/Events"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartItemsCount={cart.reduce((total, item) => total + item.quantity, 0)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/libros" element={<Books addToCart={addToCart} />} />
            <Route path="/comics" element={<Comics addToCart={addToCart} />} />
            <Route path="/manga" element={<Manga addToCart={addToCart} />} />
            <Route path="/audiolibros" element={<Audiobooks addToCart={addToCart} />} />
            <Route path="/eventos" element={<Events />} />
            <Route
              path="/carrito"
              element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/producto/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

