"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Filter, ChevronDown, Search } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { searchProducts } from "../services/api"

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    priceRange: "",
    sortBy: "relevance",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await searchProducts(query)
        setResults(data)
      } catch (error) {
        console.error("Error searching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    let filteredResults = [...results]

    // Filter by category
    if (filters.category) {
      filteredResults = filteredResults.filter((item) => item.category === filters.category)
    }

    // Filter by genre
    if (filters.genre) {
      filteredResults = filteredResults.filter((item) => item.genre === filters.genre)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filteredResults = filteredResults.filter((item) => {
        const finalPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
        return finalPrice >= min && (max ? finalPrice <= max : true)
      })
    }

    // Sort
    switch (filters.sortBy) {
      case "priceAsc":
        filteredResults.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceA - priceB
        })
        break
      case "priceDesc":
        filteredResults.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceB - priceA
        })
        break
      case "newest":
        filteredResults.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
        break
      case "bestselling":
        filteredResults.sort((a, b) => (b.sales || 0) - (a.sales || 0))
        break
      case "relevance":
      default:
        // Relevance is the default order from the API
        break
    }

    return filteredResults
  }

  const filteredResults = applyFilters()

  return (
    <div className="search-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Resultados de búsqueda: "{query}"</h1>
          <p className="results-count">
            {loading ? "Buscando..." : `${filteredResults.length} resultados encontrados`}
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="filter-toggle-container">
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} />
            <span>Filtros</span>
            <ChevronDown size={18} className={`toggle-icon ${showFilters ? "open" : ""}`} />
          </button>
        </div>

        <div className="search-container">
          {/* Filters sidebar */}
          <aside className={`filters-sidebar ${showFilters ? "show" : ""}`}>
            <div className="filters-header">
              <h2 className="filters-title">Filtros</h2>
            </div>

            <div className="filter-group">
              <label className="filter-label">Categoría</label>
              <select name="category" value={filters.category} onChange={handleFilterChange} className="filter-select">
                <option value="">Todas las categorías</option>
                <option value="books">Libros</option>
                <option value="comics">Comics</option>
                <option value="manga">Manga</option>
                <option value="audiobooks">Audiolibros</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Género</label>
              <select name="genre" value={filters.genre} onChange={handleFilterChange} className="filter-select">
                <option value="">Todos los géneros</option>
                <option value="fantasy">Fantasía</option>
                <option value="scifi">Ciencia Ficción</option>
                <option value="mystery">Misterio</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="horror">Terror</option>
                <option value="superhero">Superhéroes</option>
                <option value="shonen">Shonen</option>
                <option value="seinen">Seinen</option>
                <option value="shojo">Shojo</option>
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
                <option value="relevance">Relevancia</option>
                <option value="newest">Más recientes</option>
                <option value="bestselling">Más vendidos</option>
                <option value="priceAsc">Precio: menor a mayor</option>
                <option value="priceDesc">Precio: mayor a menor</option>
              </select>
            </div>
          </aside>

          {/* Results grid */}
          <div className="results-container">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="no-results">
                <Search size={48} className="no-results-icon" />
                <h2>No se encontraron resultados</h2>
                <p>
                  No hemos encontrado productos que coincidan con "{query}".
                  <br />
                  Intenta con otras palabras o navega por nuestras categorías.
                </p>
                <div className="suggestions">
                  <h3>Sugerencias:</h3>
                  <ul>
                    <li>Revisa la ortografía de las palabras</li>
                    <li>Utiliza términos más generales</li>
                    <li>Prueba con sinónimos</li>
                  </ul>
                </div>
                <div className="browse-categories">
                  <h3>Explorar categorías:</h3>
                  <div className="category-links">
                    <Link to="/libros" className="category-link">
                      Libros
                    </Link>
                    <Link to="/comics" className="category-link">
                      Comics
                    </Link>
                    <Link to="/manga" className="category-link">
                      Manga
                    </Link>
                    <Link to="/audiolibros" className="category-link">
                      Audiolibros
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="results-grid">
                {filteredResults.map((product) => (
                  <div key={product.id} className="result-item">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .search-page {
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
        
        .results-count {
          color: var(--color-text-secondary);
          margin-top: var(--spacing-2);
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
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          color: var(--color-text-primary);
        }
        
        .toggle-icon {
          margin-left: auto;
          transition: transform var(--transition-normal) ease;
        }
        
        .toggle-icon.open {
          transform: rotate(180deg);
        }
        
        .search-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }
        
        @media (min-width: 1024px) {
          .search-container {
            flex-direction: row;
          }
        }
        
        .filters-sidebar {
          background-color: var(--color-bg-primary);
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
          color: var(--color-text-primary);
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
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
          font-size: 0.875rem;
        }
        
        .filter-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(140, 94, 88, 0.2);
        }
        
        .results-container {
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
          background-color: var(--color-bg-primary);
          padding: var(--spacing-8);
          border-radius: var(--radius-lg);
          text-align: center;
          color: var(--color-text-secondary);
        }
        
        .no-results-icon {
          color: var(--color-text-tertiary);
          margin-bottom: var(--spacing-4);
        }
        
        .no-results h2 {
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-4);
        }
        
        .no-results p {
          margin-bottom: var(--spacing-6);
        }
        
        .suggestions {
          margin-bottom: var(--spacing-6);
          text-align: left;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .suggestions h3 {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-2);
          color: var(--color-text-primary);
        }
        
        .suggestions ul {
          list-style-type: disc;
          padding-left: var(--spacing-6);
        }
        
        .suggestions li {
          margin-bottom: var(--spacing-1);
        }
        
        .browse-categories h3 {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-4);
          color: var(--color-text-primary);
        }
        
        .category-links {
          display: flex;
          justify-content: center;
          gap: var(--spacing-4);
          flex-wrap: wrap;
        }
        
        .category-link {
          display: inline-block;
          padding: var(--spacing-2) var(--spacing-4);
          background-color: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all var(--transition-normal) ease;
        }
        
        .category-link:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: var(--spacing-6);
        }
        
        @media (min-width: 640px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 1280px) {
          .results-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default SearchPage
