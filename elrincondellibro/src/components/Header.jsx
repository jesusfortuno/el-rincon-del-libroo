"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Search, ShoppingBag, User, Sun, Moon } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useTheme } from "../contexts/ThemeContext"
import Logo from "./Logo"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartItemsCount } = useCart()
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""} ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <div className="header-inner">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="logo-wrapper">
              <Logo />
            </div>
          </div>

          <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/libros" className="nav-link">
                  Libros
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/comics" className="nav-link">
                  Comics
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manga" className="nav-link">
                  Manga
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/audiolibros" className="nav-link">
                  Audiolibros
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/eventos" className="nav-link">
                  Eventos
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-right">
            <button className="btn-icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
              <Search size={20} />
            </button>

            <button
              className="btn-icon theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/login" className="btn-icon" aria-label="Account">
              <User size={20} />
            </Link>

            <Link to="/carrito" className="btn-icon cart-icon" aria-label="Shopping cart">
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Buscar libros, autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-button">
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: var(--z-50);
          background-color: var(--color-bg-primary);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal) ease;
        }
        
        .site-header.scrolled {
          box-shadow: var(--shadow-md);
        }
        
        .site-header.dark {
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }
        
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }
        
        .header-left, .header-right {
          display: flex;
          align-items: center;
        }
        
        .logo-wrapper {
          margin-right: var(--spacing-4);
        }
        
        .menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--spacing-4);
          background: none;
          border: none;
          color: var(--color-text-primary);
          cursor: pointer;
        }
        
        @media (min-width: 1024px) {
          .menu-toggle {
            display: none;
          }
        }
        
        .main-nav {
          display: none;
        }
        
        @media (min-width: 1024px) {
          .main-nav {
            display: block;
          }
        }
        
        .main-nav.open {
          display: block;
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--color-bg-primary);
          padding: var(--spacing-6);
          z-index: var(--z-40);
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        @media (max-width: 1023px) {
          .nav-list {
            flex-direction: column;
            gap: var(--spacing-4);
          }
        }
        
        .nav-item {
          margin: 0 var(--spacing-2);
        }
        
        .nav-link {
          position: relative;
          display: inline-block;
          padding: var(--spacing-2) var(--spacing-2);
          color: var(--color-text-primary);
          font-weight: 500;
          transition: color var(--transition-normal) ease;
        }
        
        .nav-link:hover {
          color: var(--color-primary);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: var(--color-primary);
          transition: all var(--transition-normal) ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
          left: 0;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }
        
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: none;
          color: var(--color-text-primary);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .btn-icon:hover {
          background-color: var(--color-bg-secondary);
          color: var(--color-primary);
        }
        
        .theme-toggle {
          color: var(--color-text-primary);
        }
        
        .theme-toggle:hover {
          color: var(--color-primary);
        }
        
        .cart-icon {
          position: relative;
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background-color: var(--color-primary);
          color: white;
          font-size: 10px;
          font-weight: 600;
          border-radius: 50%;
        }
        
        .search-container {
          padding: var(--spacing-4) 0;
          border-top: 1px solid var(--color-border);
        }
        
        .search-form {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .search-input {
          flex: 1;
          padding: var(--spacing-2) var(--spacing-4);
          border: 1px solid var(--color-border);
          border-right: none;
          border-radius: var(--radius-md) 0 0 var(--radius-md);
          font-size: 1rem;
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        
        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-2) var(--spacing-4);
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          cursor: pointer;
        }
      `}</style>
    </header>
  )
}

export default Header
