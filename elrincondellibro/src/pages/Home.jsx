"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, ChevronLeft } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { fetchFeaturedProducts, fetchNewReleases, fetchBestSellers } from "../services/api"


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const featured = await fetchFeaturedProducts()
        const newBooks = await fetchNewReleases()
        const popular = await fetchBestSellers()

        setFeaturedProducts(featured)
        setNewReleases(newBooks)
        setBestSellers(popular)
        setLoading(false)
      } catch (error) {
        console.error("Error loading home data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const banners = [
    {
      id: 1,
      title: "Descubre nuevos mundos",
      subtitle: "Explora nuestra colección de fantasía y ciencia ficción",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/libros",
    },
    {
      id: 2,
      title: "Novedades en manga",
      subtitle: "Las últimas series y volúmenes recién llegados de Japón",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/manga",
    },
    {
      id: 3,
      title: "Ofertas especiales",
      subtitle: "Hasta 30% de descuento en títulos seleccionados",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/ofertas",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Banner Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full relative">
              <img
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h1>
                  <p className="text-lg md:text-xl mb-6">{banner.subtitle}</p>
                  <Link
                    to={banner.link}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Destacados</h2>
          <Link to="/destacados" className="text-primary hover:underline flex items-center">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Novedades</h2>
            <Link to="/novedades" className="text-primary hover:underline flex items-center">
              Ver todas <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newReleases.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} addToCart={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Los más vendidos</h2>
          <Link to="/mas-vendidos" className="text-primary hover:underline flex items-center">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestra newsletter</h2>
            <p className="mb-6">Recibe las últimas novedades, ofertas exclusivas y recomendaciones personalizadas.</p>

            <form className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-2 rounded-md text-gray-800 w-full sm:w-auto"
                required
              />
              <button
                type="submit"
                className="bg-white text-primary font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

