"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X, Search, User } from "lucide-react"

const Navbar = ({ cartItemsCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">El Rincón del Libro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Inicio
            </Link>
            <Link to="/libros" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Libros
            </Link>
            <Link to="/comics" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Comics
            </Link>
            <Link to="/manga" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Manga
            </Link>
            <Link
              to="/audiolibros"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary"
            >
              Audiolibros
            </Link>
            <Link to="/eventos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Eventos
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-1 rounded-full text-gray-700 hover:text-primary focus:outline-none"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/login" className="p-1 rounded-full text-gray-700 hover:text-primary">
              <User size={20} />
            </Link>
            <Link to="/carrito" className="p-1 rounded-full text-gray-700 hover:text-primary relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/libros"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Libros
            </Link>
            <Link
              to="/comics"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Comics
            </Link>
            <Link
              to="/manga"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Manga
            </Link>
            <Link
              to="/audiolibros"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Audiolibros
            </Link>
            <Link
              to="/eventos"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar libros, autores..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

