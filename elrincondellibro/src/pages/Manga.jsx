"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { fetchManga } from "../services/api"

const Manga = ({ addToCart }) => {
  const [manga, setManga] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    genre: "",
    priceRange: "",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadManga = async () => {
      try {
        const data = await fetchManga()
        setManga(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading manga:", error)
        setLoading(false)
      }
    }

    loadManga()
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    let filteredManga = [...manga]

    // Filter by genre
    if (filters.genre) {
      filteredManga = filteredManga.filter((item) => item.genre === filters.genre)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filteredManga = filteredManga.filter((item) => {
        const finalPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

        return finalPrice >= min && (max ? finalPrice <= max : true)
      })
    }

    // Sort
    switch (filters.sortBy) {
      case "priceAsc":
        filteredManga.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceA - priceB
        })
        break
      case "priceDesc":
        filteredManga.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceB - priceA
        })
        break
      case "newest":
        filteredManga.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        break
      case "bestselling":
        filteredManga.sort((a, b) => b.sales - a.sales)
        break
      default:
        break
    }

    return filteredManga
  }

  const filteredManga = applyFilters()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manga</h1>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between bg-white p-3 rounded-md shadow"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            <span>Filtros</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`w-full md:w-64 bg-white p-4 rounded-md shadow ${showFilters ? "block" : "hidden md:block"}`}>
          <h2 className="font-semibold text-lg mb-4">Filtros</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Todos los géneros</option>
              <option value="shonen">Shonen</option>
              <option value="shojo">Shojo</option>
              <option value="seinen">Seinen</option>
              <option value="fantasy">Fantasía</option>
              <option value="action">Acción</option>
              <option value="horror">Terror</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rango de precio</label>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Cualquier precio</option>
              <option value="0-10">Menos de 10€</option>
              <option value="10-20">10€ - 20€</option>
              <option value="20-30">20€ - 30€</option>
              <option value="30-">Más de 30€</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="newest">Más recientes</option>
              <option value="bestselling">Más vendidos</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {filteredManga.length === 0 ? (
            <div className="bg-white p-6 rounded-md shadow text-center">
              <p className="text-gray-500">No se encontraron mangas con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredManga.map((item) => (
                <ProductCard key={item.id} product={item} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Manga

