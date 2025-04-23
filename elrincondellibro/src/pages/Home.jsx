"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { fetchFeaturedProducts, fetchNewReleases, fetchBestSellers } from "../services/api"
import "./home.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const carouselRef = useRef(null)

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, newBooks, popular] = await Promise.all([
          fetchFeaturedProducts(),
          fetchNewReleases(),
          fetchBestSellers(),
        ])

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner" aria-label="Cargando..."></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Banner Carousel */}
      <div className="carousel-container" ref={carouselRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {banners.map((banner) => (
            <div key={banner.id} className="carousel-slide">
              <img src={banner.image || "/placeholder.svg"} alt={banner.title} className="carousel-image" />
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h1 className="carousel-title">{banner.title}</h1>
                  <p className="carousel-subtitle">{banner.subtitle}</p>
                  <Link to={banner.link} className="btn btn-primary mt-4">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={prevSlide} className="carousel-button carousel-button-prev" aria-label="Anterior">
          <ChevronLeft size={24} />
        </button>

        <button onClick={nextSlide} className="carousel-button carousel-button-next" aria-label="Siguiente">
          <ChevronRight size={24} />
        </button>

        <div className="carousel-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-indicator ${currentSlide === index ? "active" : ""}`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Destacados</h2>
          <Link to="/destacados" className="text-primary hover:text-primary-dark flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="bg-white py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Novedades</h2>
            <Link to="/novedades" className="text-primary hover:text-primary-dark flex items-center gap-1">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} addToCart={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Los más vendidos</h2>
          <Link to="/mas-vendidos" className="text-primary hover:text-primary-dark flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <h2 className="newsletter-title">Suscríbete a nuestra newsletter</h2>
            <p className="newsletter-description">
              Recibe las últimas novedades, ofertas exclusivas y recomendaciones personalizadas directamente en tu
              email.
            </p>

            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" required />
              <button type="submit" className="newsletter-button">
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
