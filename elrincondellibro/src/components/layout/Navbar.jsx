"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X, Search, User } from "lucide-react"
import "./navbar.css"

const Navbar = ({ cartItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <button type="button" className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="logo">
              <span>El Rincón del Libro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/libros" className="nav-link">
              Libros
            </Link>
            <Link to="/comics" className="nav-link">
              Comics
            </Link>
            <Link to="/manga" className="nav-link">
              Manga
            </Link>
            <Link to="/audiolibros" className="nav-link">
              Audiolibros
            </Link>
            <Link to="/eventos" className="nav-link">
              Eventos
            </Link>
          </div>

          <div className="navbar-right">
            <button className="icon-button" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </button>
            <Link to="/login" className="icon-button">
              <User size={20} />
            </Link>
            <Link to="/carrito" className="icon-button cart-icon">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/libros" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Libros
            </Link>
            <Link to="/comics" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Comics
            </Link>
            <Link to="/manga" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Manga
            </Link>
            <Link to="/audiolibros" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Audiolibros
            </Link>
            <Link to="/eventos" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Eventos
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-container">
          <div className="search-wrapper">
            <input type="text" placeholder="Buscar libros, autores..." className="search-input" />
            <button className="search-button">
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

