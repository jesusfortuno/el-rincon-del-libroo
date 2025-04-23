"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X, Search, User } from "lucide-react"
import "./navbar.css"

const Navbar = ({ cartItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(".navbar") && !e.target.closest(".mobile-nav")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <nav className={`navbar ${scrolled ? "shadow-md" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
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
            <button className="icon-button" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/login" className="icon-button" aria-label="User account">
              <User size={20} />
            </Link>
            <Link to="/carrito" className="icon-button cart-icon" aria-label="Shopping cart">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount > 99 ? "99+" : cartItemsCount}</span>}
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
          <div className="search-container">
            <div className="search-wrapper">
              <Search size={18} className="search-button" />
              <input type="text" placeholder="Buscar libros, autores..." className="search-input" autoFocus />
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && !isMenuOpen && (
        <div className="search-container">
          <div className="search-wrapper">
            <Search size={18} className="search-button" />
            <input type="text" placeholder="Buscar libros, autores..." className="search-input" autoFocus />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
