"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { fetchAudiobooks } from "../services/api"

const Audiobooks = ({ addToCart }) => {
  const [audiobooks, setAudiobooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    genre: "",
    priceRange: "",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadAudiobooks = async () => {
      try {
        const data = await fetchAudiobooks()
        setAudiobooks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading audiobooks:", error)
        setLoading(false)
      }
    }

    loadAudiobooks()
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    let filteredAudiobooks = [...audiobooks]

    // Filter by genre
    if (filters.genre) {
      filteredAudiobooks = filteredAudiobooks.filter((audiobook) => audiobook.genre === filters.genre)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filteredAudiobooks = filteredAudiobooks.filter((audiobook) => {
        const finalPrice = audiobook.discount
          ? audiobook.price - (audiobook.price * audiobook.discount) / 100
          : audiobook.price

        return finalPrice >= min && (max ? finalPrice <= max : true)
      })
    }

    // Sort
    switch (filters.sortBy) {
      case "priceAsc":
        filteredAudiobooks.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceA - priceB
        })
        break
      case "priceDesc":
        filteredAudiobooks.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount) / 100 : a.price
          const priceB = b.discount ? b.price - (b.price * b.discount) / 100 : b.price
          return priceB - priceA
        })
        break
      case "newest":
        filteredAudiobooks.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        break
      case "bestselling":
        filteredAudiobooks.sort((a, b) => b.sales - a.sales)
        break
      default:
        break
    }

    return filteredAudiobooks
  }

  const filteredAudiobooks = applyFilters()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Audiolibros</h1>

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
              <option value="fantasy">Fantasía</option>
              <option value="scifi">Ciencia Ficción</option>
              <option value="mystery">Misterio</option>
              <option value="romance">Romance</option>
              <option value="nonfiction">No ficción</option>
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
              <option value="0-15">Menos de 15€</option>
              <option value="15-25">15€ - 25€</option>
              <option value="25-35">25€ - 35€</option>
              <option value="35-">Más de 35€</option>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
            <select name="duration" className="w-full p-2 border rounded-md">
              <option value="">Cualquier duración</option>
              <option value="short">Menos de 5 horas</option>
              <option value="medium">5 - 10 horas</option>
              <option value="long">Más de 10 horas</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {filteredAudiobooks.length === 0 ? (
            <div className="bg-white p-6 rounded-md shadow text-center">
              <p className="text-gray-500">No se encontraron audiolibros con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAudiobooks.map((audiobook) => (
                <ProductCard key={audiobook.id} product={audiobook} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Audiobooks

