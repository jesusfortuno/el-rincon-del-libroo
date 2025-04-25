"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, ChevronLeft, TrendingUp, Percent, BookOpen, Star } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { supabase, checkSupabaseConnection } from "../lib/supabase"
import { fetchNewReleases, fetchBestSellers } from "../services/api"

const HomePage = () => {
  const [newReleases, setNewReleases] = useState([])
  const [discountedBooks, setDiscountedBooks] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(null)

  // Para los sliders
  const [currentNewReleasesPage, setCurrentNewReleasesPage] = useState(0)
  const [currentDiscountedPage, setCurrentDiscountedPage] = useState(0)
  const [currentAllProductsPage, setCurrentAllProductsPage] = useState(0)

  const itemsPerPage = 4
  const itemsPerPageMobile = 1

  // Determinar cuántos elementos mostrar por página según el ancho de la pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const itemsToShow = windowWidth < 768 ? itemsPerPageMobile : itemsPerPage

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection()
      setConnectionStatus(isConnected)
    }

    checkConnection()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Cargar nuevos lanzamientos
        const newReleasesData = await fetchNewReleases()

        // Cargar productos con descuento
        const { data: discountedData, error: discountError } = await supabase
          .from("products")
          .select("*")
          .gt("discount", 0)
          .order("discount", { ascending: false })
          .limit(12)

        if (discountError) throw discountError

        // Cargar bestsellers
        const bestSellersData = await fetchBestSellers()

        // Cargar todos los productos
        const { data: allProductsData, error: allProductsError } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20)

        if (allProductsError) throw allProductsError

        // Si no hay datos, usar datos de ejemplo
        setNewReleases(newReleasesData.length > 0 ? newReleasesData : getMockNewReleases())
        setDiscountedBooks(discountedData?.length > 0 ? discountedData : getMockDiscountedBooks())
        setBestSellers(bestSellersData.length > 0 ? bestSellersData : getMockBestSellers())
        setAllProducts(allProductsData?.length > 0 ? allProductsData : getMockAllProducts())

        setLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError(err.message)

        // Usar datos de ejemplo en caso de error
        setNewReleases(getMockNewReleases())
        setDiscountedBooks(getMockDiscountedBooks())
        setBestSellers(getMockBestSellers())
        setAllProducts(getMockAllProducts())

        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Funciones para navegar por los sliders
  const nextNewReleasesPage = () => {
    const maxPage = Math.ceil(newReleases.length / itemsToShow) - 1
    setCurrentNewReleasesPage((current) => (current < maxPage ? current + 1 : 0))
  }

  const prevNewReleasesPage = () => {
    const maxPage = Math.ceil(newReleases.length / itemsToShow) - 1
    setCurrentNewReleasesPage((current) => (current > 0 ? current - 1 : maxPage))
  }

  const nextDiscountedPage = () => {
    const maxPage = Math.ceil(discountedBooks.length / itemsToShow) - 1
    setCurrentDiscountedPage((current) => (current < maxPage ? current + 1 : 0))
  }

  const prevDiscountedPage = () => {
    const maxPage = Math.ceil(discountedBooks.length / itemsToShow) - 1
    setCurrentDiscountedPage((current) => (current > 0 ? current - 1 : maxPage))
  }

  const nextAllProductsPage = () => {
    const maxPage = Math.ceil(allProducts.length / itemsToShow) - 1
    setCurrentAllProductsPage((current) => (current < maxPage ? current + 1 : 0))
  }

  const prevAllProductsPage = () => {
    const maxPage = Math.ceil(allProducts.length / itemsToShow) - 1
    setCurrentAllProductsPage((current) => (current > 0 ? current - 1 : maxPage))
  }

  // Datos de ejemplo en caso de que no haya conexión a la base de datos
  const getMockNewReleases = () => [
    {
      id: 1,
      title: "El Mesías de Dune",
      author: "Frank Herbert",
      cover: "/src/imagen/el-mesias-de-dune-las-cronicas-de-dune-02.jpg",
      price: 19.99,
      discount: 10,
      description: "Segunda novela de la saga Dune, continuando la historia de Paul Atreides.",
      publisher: "Debolsillo",
      publish_date: "2023-05-15",
      pages: 350,
      isbn: "9788497596824",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.7,
      review_count: 128,
      stock: 15,
      new_release: true,
    },
    {
      id: 2,
      title: "Fundación",
      author: "Isaac Asimov",
      cover: "/placeholder.svg?height=400&width=300",
      price: 18.5,
      discount: 0,
      description: "Primera novela de la serie Fundación, una obra maestra de la ciencia ficción.",
      publisher: "Debolsillo",
      publish_date: "2023-10-10",
      pages: 320,
      isbn: "9788497596725",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.8,
      review_count: 156,
      stock: 20,
      new_release: true,
    },
    {
      id: 3,
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      cover: "/placeholder.svg?height=400&width=300",
      price: 22.5,
      discount: 10,
      description: "Primera parte de la trilogía Crónica del Asesino de Reyes.",
      publisher: "Plaza & Janés",
      publish_date: "2023-08-15",
      pages: 880,
      isbn: "9788401352836",
      language: "Español",
      category: "books",
      genre: "fantasy",
      rating: 4.9,
      review_count: 243,
      stock: 25,
      new_release: true,
    },
    {
      id: 4,
      title: "Berserk Deluxe Vol. 1",
      author: "Kentaro Miura",
      cover: "/placeholder.svg?height=400&width=300",
      price: 49.99,
      discount: 10,
      description: "Edición de lujo del manga Berserk.",
      publisher: "Panini",
      publish_date: "2023-07-20",
      pages: 696,
      isbn: "9788467940626",
      language: "Español",
      category: "manga",
      genre: "seinen",
      rating: 4.9,
      review_count: 543,
      stock: 10,
      new_release: true,
    },
    {
      id: 5,
      title: "Watchmen",
      author: "Alan Moore, Dave Gibbons",
      cover: "/placeholder.svg?height=400&width=300",
      price: 29.95,
      discount: 5,
      description: "Edición completa del cómic revolucionario de Alan Moore.",
      publisher: "ECC Ediciones",
      publish_date: "2023-09-05",
      pages: 416,
      isbn: "9788418862250",
      language: "Español",
      category: "comics",
      genre: "superhero",
      rating: 4.8,
      review_count: 876,
      stock: 18,
      new_release: true,
    },
  ]

  const getMockDiscountedBooks = () => [
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      cover: "/placeholder.svg?height=400&width=300",
      price: 21.95,
      discount: 20,
      description: "La obra maestra de la ciencia ficción.",
      publisher: "Debolsillo",
      publish_date: "2020-01-15",
      pages: 784,
      isbn: "9788466353779",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.9,
      review_count: 987,
      stock: 30,
    },
    {
      id: 7,
      title: "Neuromante",
      author: "William Gibson",
      cover: "/placeholder.svg?height=400&width=300",
      price: 18.95,
      discount: 15,
      description: "La novela que definió el género cyberpunk.",
      publisher: "Minotauro",
      publish_date: "2020-03-10",
      pages: 320,
      isbn: "9788445076538",
      language: "Español",
      category: "books",
      genre: "scifi",
      rating: 4.7,
      review_count: 456,
      stock: 12,
    },
    {
      id: 8,
      title: "One Piece Vol. 98",
      author: "Eiichiro Oda",
      cover: "/placeholder.svg?height=400&width=300",
      price: 8.95,
      discount: 10,
      description: "Continúa la aventura del Rey de los Piratas.",
      publisher: "Planeta Cómic",
      publish_date: "2021-02-23",
      pages: 192,
      isbn: "9788491739876",
      language: "Español",
      category: "manga",
      genre: "shonen",
      rating: 4.8,
      review_count: 187,
      stock: 30,
    },
    {
      id: 9,
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      cover: "/placeholder.svg?height=400&width=300",
      price: 24.99,
      discount: 25,
      description: "El inicio de la saga Harry Potter.",
      publisher: "Salamandra",
      publish_date: "2020-01-15",
      pages: 256,
      isbn: "9788478884452",
      language: "Español",
      category: "books",
      genre: "fantasy",
      rating: 4.9,
      review_count: 1245,
      stock: 40,
    },
  ]

  const getMockBestSellers = () => [
    {
      id: 10,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover: "/placeholder.svg?height=400&width=300",
      price: 12.95,
      discount: 0,
      description: "La obra maestra del realismo mágico.",
      publisher: "Debolsillo",
      publish_date: "2017-05-15",
      pages: 496,
      isbn: "9788497592208",
      language: "Español",
      category: "books",
      genre: "fiction",
      rating: 4.9,
      review_count: 2345,
      stock: 50,
      best_seller: true,
    },
    {
      id: 11,
      title: "1984",
      author: "George Orwell",
      cover: "/placeholder.svg?height=400&width=300",
      price: 10.95,
      discount: 0,
      description: "La distopía más influyente de todos los tiempos.",
      publisher: "Debolsillo",
      publish_date: "2018-06-20",
      pages: 352,
      isbn: "9788499890944",
      language: "Español",
      category: "books",
      genre: "fiction",
      rating: 4.8,
      review_count: 1876,
      stock: 35,
      best_seller: true,
    },
    {
      id: 12,
      title: "Attack on Titan Vol. 1",
      author: "Hajime Isayama",
      cover: "/placeholder.svg?height=400&width=300",
      price: 9.95,
      discount: 0,
      description: "El manga que revolucionó la industria.",
      publisher: "Norma Editorial",
      publish_date: "2015-03-15",
      pages: 192,
      isbn: "9788467917345",
      language: "Español",
      category: "manga",
      genre: "shonen",
      rating: 4.9,
      review_count: 1543,
      stock: 25,
      best_seller: true,
    },
    {
      id: 13,
      title: "Batman: El regreso del Caballero Oscuro",
      author: "Frank Miller",
      cover: "/placeholder.svg?height=400&width=300",
      price: 21.5,
      discount: 0,
      description: "Una de las historias más influyentes de Batman.",
      publisher: "ECC Ediciones",
      publish_date: "2019-06-15",
      pages: 224,
      isbn: "9788417665789",
      language: "Español",
      category: "comics",
      genre: "superhero",
      rating: 4.8,
      review_count: 978,
      stock: 15,
      best_seller: true,
    },
  ]

  const getMockAllProducts = () => [...getMockNewReleases(), ...getMockDiscountedBooks(), ...getMockBestSellers()]

  // Componente para el banner principal
  const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
      {
        title: "Descubre los mejores libros de fantasía",
        description: "Sumérgete en mundos mágicos y aventuras épicas",
        image: "/placeholder.svg?height=600&width=1200",
        link: "/libros",
        buttonText: "Explorar",
      },
      {
        title: "Nuevos lanzamientos de manga",
        description: "Las últimas novedades de tus series favoritas",
        image: "/placeholder.svg?height=600&width=1200",
        link: "/manga",
        buttonText: "Ver colección",
      },
      {
        title: "Ofertas especiales",
        description: "Hasta 25% de descuento en títulos seleccionados",
        image: "/placeholder.svg?height=600&width=1200",
        link: "/ofertas",
        buttonText: "Ver ofertas",
      },
    ]

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }, 5000)

      return () => clearInterval(interval)
    }, [slides.length])

    const goToSlide = (index) => {
      setCurrentSlide(index)
    }

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
      <div className="hero-banner">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
            >
              <div className="slide-image">
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
              </div>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <Link to={slide.link} className="slide-button">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button className="slide-arrow prev" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="slide-arrow next" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  // Componente para las categorías destacadas
  const FeaturedCategories = () => {
    const categories = [
      { name: "Fantasía", icon: "🧙‍♂️", link: "/libros?genre=fantasy" },
      { name: "Ciencia Ficción", icon: "🚀", link: "/libros?genre=scifi" },
      { name: "Manga", icon: "📚", link: "/manga" },
      { name: "Comics", icon: "💥", link: "/comics" },
      { name: "Audiolibros", icon: "🎧", link: "/audiolibros" },
    ]

    return (
      <div className="featured-categories">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-card">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    )
  }

  // Componente para la sección de newsletter
  const Newsletter = () => {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      // Aquí iría la lógica para suscribir al usuario
      setSubscribed(true)
      setEmail("")

      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setSubscribed(false)
      }, 5000)
    }

    return (
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h3>Suscríbete a nuestra newsletter</h3>
          <p>Recibe las últimas novedades, ofertas exclusivas y recomendaciones personalizadas.</p>

          {subscribed ? (
            <div className="success-message">¡Gracias por suscribirte! Pronto recibirás nuestras novedades.</div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
              />
              <button type="submit">Suscribirse</button>
            </form>
          )}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
          <h2 className="text-xl font-bold mb-2">Error al cargar los productos</h2>
          <p>{error}</p>
          <p className="mt-2">
            Estado de conexión a Supabase:{" "}
            {connectionStatus === null ? "Verificando..." : connectionStatus ? "Conectado" : "Error de conexión"}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <HeroBanner />

      <div className="container">
        {/* Categorías destacadas */}
        <section className="section">
          <FeaturedCategories />
        </section>

        {/* Nuevos lanzamientos */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <BookOpen className="section-icon" size={24} />
              Nuevos lanzamientos
            </h2>
            <Link to="/libros?sort=newest" className="view-all">
              Ver todos
            </Link>
          </div>

          <div className="slider-container">
            <button className="slider-arrow prev" onClick={prevNewReleasesPage}>
              <ChevronLeft size={20} />
            </button>

            <div className="slider-content">
              {newReleases
                .slice(currentNewReleasesPage * itemsToShow, currentNewReleasesPage * itemsToShow + itemsToShow)
                .map((product) => (
                  <div className="slider-item" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

            <button className="slider-arrow next" onClick={nextNewReleasesPage}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: Math.ceil(newReleases.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentNewReleasesPage ? "active" : ""}`}
                onClick={() => setCurrentNewReleasesPage(index)}
                aria-label={`Página ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Ofertas especiales */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Percent className="section-icon" size={24} />
              Ofertas especiales
            </h2>
            <Link to="/libros?discount=true" className="view-all">
              Ver todas
            </Link>
          </div>

          <div className="slider-container">
            <button className="slider-arrow prev" onClick={prevDiscountedPage}>
              <ChevronLeft size={20} />
            </button>

            <div className="slider-content">
              {discountedBooks
                .slice(currentDiscountedPage * itemsToShow, currentDiscountedPage * itemsToShow + itemsToShow)
                .map((product) => (
                  <div className="slider-item" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

            <button className="slider-arrow next" onClick={nextDiscountedPage}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: Math.ceil(discountedBooks.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentDiscountedPage ? "active" : ""}`}
                onClick={() => setCurrentDiscountedPage(index)}
                aria-label={`Página ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Más vendidos */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className="section-icon" size={24} />
              Los más vendidos
            </h2>
            <Link to="/libros?sort=bestselling" className="view-all">
              Ver todos
            </Link>
          </div>

          <div className="bestsellers-grid">
            {bestSellers.slice(0, 4).map((product) => (
              <div className="bestseller-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Todos los productos */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Star className="section-icon" size={24} />
              Catálogo completo
            </h2>
            <Link to="/libros" className="view-all">
              Ver todos
            </Link>
          </div>

          <div className="slider-container">
            <button className="slider-arrow prev" onClick={prevAllProductsPage}>
              <ChevronLeft size={20} />
            </button>

            <div className="slider-content">
              {allProducts
                .slice(currentAllProductsPage * itemsToShow, currentAllProductsPage * itemsToShow + itemsToShow)
                .map((product) => (
                  <div className="slider-item" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

            <button className="slider-arrow next" onClick={nextAllProductsPage}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: Math.ceil(allProducts.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentAllProductsPage ? "active" : ""}`}
                onClick={() => setCurrentAllProductsPage(index)}
                aria-label={`Página ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </div>

      <style jsx>{`
        .home-page {
          padding-bottom: var(--spacing-16);
        }
        
        /* Hero Banner */
        .hero-banner {
          position: relative;
          height: 500px;
          overflow: hidden;
          margin-bottom: var(--spacing-12);
        }
        
        @media (max-width: 768px) {
          .hero-banner {
            height: 400px;
          }
        }
        
        .slides-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease-in-out;
        }
        
        .slide-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
        }
        
        .slide-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: var(--spacing-6);
        }
        
        .slide-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-4);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slide-content p {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-6);
          max-width: 600px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .slide-button {
          display: inline-block;
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: all var(--transition-normal) ease;
        }
        
        .slide-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .slide-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.8);
          color: var(--color-gray-900);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all var(--transition-normal) ease;
        }
        
        .slide-arrow:hover {
          background-color: white;
          transform: translateY(-50%) scale(1.1);
        }
        
        .slide-arrow.prev {
          left: var(--spacing-4);
        }
        
        .slide-arrow.next {
          right: var(--spacing-4);
        }
        
        .slide-indicators {
          position: absolute;
          bottom: var(--spacing-4);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--spacing-2);
          z-index: 10;
        }
        
        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .indicator.active {
          background-color: white;
          transform: scale(1.3);
        }
        
        /* Featured Categories */
        .featured-categories {
          display: flex;
          justify-content: space-between;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-8);
          flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
          .featured-categories {
            justify-content: center;
          }
        }
        
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--spacing-4);
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal) ease;
          flex: 1;
          min-width: 120px;
          text-align: center;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .category-icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-2);
        }
        
        .category-name {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        
        /* Section Styles */
        .section {
          margin-bottom: var(--spacing-12);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-6);
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }
        
        .section-icon {
          color: var(--color-primary);
        }
        
        .view-all {
          color: var(--color-primary);
          font-weight: 600;
          transition: all var(--transition-normal) ease;
        }
        
        .view-all:hover {
          color: var(--color-primary-dark);
          text-decoration: underline;
        }
        
        /* Slider Styles */
        .slider-container {
          position: relative;
          padding: 0 var(--spacing-6);
        }
        
        .slider-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
        }
        
        @media (max-width: 1024px) {
          .slider-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .slider-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .slider-content {
            grid-template-columns: repeat(1, 1fr);
          }
        }
        
        .slider-item {
          width: 100%;
        }
        
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          cursor: pointer;
          z-index: 5;
          transition: all var(--transition-normal) ease;
        }
        
        .slider-arrow:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        
        .slider-arrow.prev {
          left: 0;
        }
        
        .slider-arrow.next {
          right: 0;
        }
        
        .slider-dots {
          display: flex;
          justify-content: center;
          gap: var(--spacing-2);
          margin-top: var(--spacing-4);
        }
        
        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-gray-300);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .slider-dot.active {
          background-color: var(--color-primary);
          transform: scale(1.3);
        }
        
        /* Bestsellers Grid */
        .bestsellers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
        }
        
        @media (max-width: 1024px) {
          .bestsellers-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .bestsellers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .bestsellers-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
        
        /* Newsletter Section */
        .newsletter-section {
          background-color: var(--color-bg-tertiary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-8);
          margin-top: var(--spacing-12);
        }
        
        .newsletter-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        .newsletter-content h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-2);
          color: var(--color-primary);
        }
        
        .newsletter-content p {
          margin-bottom: var(--spacing-6);
          color: var(--color-text-secondary);
        }
        
        .newsletter-form {
          display: flex;
          gap: var(--spacing-2);
        }
        
        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column;
          }
        }
        
        .newsletter-form input {
          flex: 1;
          padding: var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
        }
        
        .newsletter-form button {
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .newsletter-form button:hover {
          background-color: var(--color-primary-dark);
        }
        
        .success-message {
          padding: var(--spacing-4);
          background-color: #d1fae5;
          color: #065f46;
          border-radius: var(--radius-md);
          font-weight: 500;
        }
        
        /* Spinner */
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
      `}</style>
    </div>
  )
}

export default HomePage
