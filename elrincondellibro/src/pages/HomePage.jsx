"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Hero from "../components/Hero"
import ProductCard from "../components/ProductCard"
import { fetchFeaturedProducts, fetchNewReleases, fetchBestSellers } from "../services/api"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)

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

  const heroSlides = [
    {
      title: "Descubre nuevos mundos",
      description: "Explora nuestra colección de fantasía y ciencia ficción",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/libros",
      buttonText: "Explorar",
    },
    {
      title: "Novedades en manga",
      description: "Las últimas series y volúmenes recién llegados de Japón",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/manga",
      buttonText: "Ver colección",
    },
    {
      title: "Ofertas especiales",
      description: "Hasta 30% de descuento en títulos seleccionados",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/ofertas",
      buttonText: "Ver ofertas",
    },
  ]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <Hero slides={heroSlides} />

      <div className="container">
        {/* Featured Products */}
        <section className="product-section">
          <div className="section-header">
            <h2 className="section-title">Destacados</h2>
            <Link to="/destacados" className="view-all-link">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="product-section">
          <div className="section-header">
            <h2 className="section-title">Novedades</h2>
            <Link to="/novedades" className="view-all-link">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {newReleases.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="product-section">
          <div className="section-header">
            <h2 className="section-title">Los más vendidos</h2>
            <Link to="/mas-vendidos" className="view-all-link">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
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
        </section>
      </div>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
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
        
        .product-section {
          margin-bottom: var(--spacing-16);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-6);
        }
        
        .section-title {
          position: relative;
          font-size: 1.75rem;
          padding-bottom: var(--spacing-3);
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--color-primary);
        }
        
        .view-all-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          color: var(--color-primary);
          font-weight: 500;
          transition: all var(--transition-normal) ease;
        }
        
        .view-all-link:hover {
          color: var(--color-primary-dark);
          gap: var(--spacing-2);
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: var(--spacing-6);
        }
        
        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .newsletter-section {
          margin: var(--spacing-16) 0;
          padding: var(--spacing-12) 0;
          background-color: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
        }
        
        .newsletter-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 0 var(--spacing-4);
        }
        
        .newsletter-title {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-4);
          color: var(--color-text-primary);
        }
        
        .newsletter-description {
          margin-bottom: var(--spacing-6);
          color: var(--color-text-secondary);
        }
        
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }
        
        @media (min-width: 640px) {
          .newsletter-form {
            flex-direction: row;
          }
        }
        
        .newsletter-input {
          flex: 1;
          padding: var(--spacing-3) var(--spacing-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(140, 94, 88, 0.2);
        }
        
        .newsletter-button {
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .newsletter-button:hover {
          background-color: var(--color-primary-dark);
        }
      `}</style>
    </div>
  )
}

export default HomePage
