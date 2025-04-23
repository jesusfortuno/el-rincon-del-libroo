"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { fetchComics } from "../services/api"

const ComicsPage = () => {
  const [comics, setComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    genre: "",
    priceRange: "",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadComics = async () => {
      try {
        const data = await fetchComics()
        setComics(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading comics:", error)
        setLoading(false)
      }
    }

    loadComics()
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    let filteredComics = [...comics]

    // Filter by genre
    if (filters.genre) {
      filteredComics = filteredComics.filter((comic) => comic.genre === filters.genre)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filteredComics = filteredComics.filter((comic) => {
        const finalPrice = comic.discount ? comic.price - (comic.price * comic.discount) / 100 : comic.price
        return finalPrice >= min && (max ? finalPrice <= max : true)
      })
    }

    // Sort
    switch (filters.sortBy) {
      case "priceAsc":
        filteredComics.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceA - priceB
        })
        break
      case "priceDesc":
        filteredComics.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceB - priceA
        })
        break
      case "newest":
        filteredComics.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        break
      case "bestselling":
        filteredComics.sort((a, b) => b.sales - a.sales)
        break
      default:
        break
    }

    return filteredComics
  }

  const filteredComics = applyFilters()

  return (
    <div className="comics-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Comics</h1>
        </div>

        {/* Mobile filter toggle */}
        <div className="filter-toggle-container">
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} />
            <span>Filtros</span>
            <ChevronDown size={18} className={`toggle-icon ${showFilters ? "open" : ""}`} />
          </button>
        </div>

        <div className="comics-container">
          {/* Filters sidebar */}
          <aside className={`filters-sidebar ${showFilters ? "show" : ""}`}>
            <div className="filters-header">
              <h2 className="filters-title">Filtros</h2>
            </div>

            <div className="filter-group">
              <label className="filter-label">Género</label>
              <select name="genre" value={filters.genre} onChange={handleFilterChange} className="filter-select">
                <option value="">Todos los géneros</option>
                <option value="superhero">Superhéroes</option>
                <option value="scifi">Ciencia Ficción</option>
                <option value="fantasy">Fantasía</option>
                <option value="horror">Terror</option>
                <option value="adventure">Aventura</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Rango de precio</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Cualquier precio</option>
                <option value="0-10">Menos de 10€</option>
                <option value="10-20">10€ - 20€</option>
                <option value="20-30">20€ - 30€</option>
                <option value="30-">Más de 30€</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Ordenar por</label>
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="filter-select">
                <option value="newest">Más recientes</option>
                <option value="bestselling">Más vendidos</option>
                <option value="priceAsc">Precio: menor a mayor</option>
                <option value="priceDesc">Precio: mayor a menor</option>
              </select>
            </div>
          </aside>

          {/* Products grid */}
          <div className="products-container">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              </div>
            ) : filteredComics.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron comics con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredComics.map((comic) => (
                  <ProductCard key={comic.id} product={comic} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .comics-page {
          padding-bottom: var(--spacing-16);
        }
        
        .page-header {
          margin-bottom: var(--spacing-8);
        }
        
        .page-title {
          font-size: 2rem;
          position: relative;
          padding-bottom: var(--spacing-4);
        }
        
        .page-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--color-primary);
        }
        
        .filter-toggle-container {
          margin-bottom: var(--spacing-6);
          display: block;
        }
        
        @media (min-width: 1024px) {
          .filter-toggle-container {
            display: none;
          }
        }
        
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          background-color: white;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
        }
        
        .toggle-icon {
          margin-left: auto;
          transition: transform var(--transition-normal) ease;
        }
        
        .toggle-icon.open {
          transform: rotate(180deg);
        }
        
        .comics-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }
        
        @media (min-width: 1024px) {
          .comics-container {
            flex-direction: row;
          }
        }
        
        .filters-sidebar {
          background-color: white;
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          box-shadow: var(--shadow-sm);
          display: none;
        }
        
        .filters-sidebar.show {
          display: block;
        }
        
        @media (min-width: 1024px) {
          .filters-sidebar {
            display: block;
            width: 280px;
            flex-shrink: 0;
            position: sticky;
            top: 90px;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
          }
        }
        
        .filters-header {
          margin-bottom: var(--spacing-4);
        }
        
        .filters-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .filter-group {
          margin-bottom: var(--spacing-4);
        }
        
        .filter-label {
          display: block;
          margin-bottom: var(--spacing-2);
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .filter-select {
          width: 100%;
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background-color: white;
          font-size: 0.875rem;
        }
        
        .filter-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(140, 94, 88, 0.2);
        }
        
        .products-container {
          flex: 1;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .no-results {
          background-color: white;
          padding: var(--spacing-8);
          border-radius: var(--radius-lg);
          text-align: center;
          color: var(--color-text-secondary);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: var(--spacing-6);
        }
        
        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 1280px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default ComicsPage
