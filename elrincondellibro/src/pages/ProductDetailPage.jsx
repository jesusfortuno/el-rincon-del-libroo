"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ShoppingBag, Heart, Share2, Star, ChevronRight, Plus, Minus } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { fetchProductById, fetchRelatedProducts } from "../services/api"
import ProductCard from "../components/ProductCard"

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productData = await fetchProductById(id)
        setProduct(productData)

        if (productData) {
          const related = await fetchRelatedProducts(productData.category, productData.id)
          setRelatedProducts(related)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error loading product:", error)
        setLoading(false)
      }
    }

    loadProduct()
    // Reset quantity when product changes
    setQuantity(1)
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/" className="btn btn-primary">
            Volver a la página principal
          </Link>
        </div>
      </div>
    )
  }

  const {
    title,
    author,
    cover,
    price,
    discount,
    description,
    publisher,
    publish_date: publishDate,
    pages,
    isbn,
    language,
    rating,
    review_count: reviewCount,
    stock,
    imageSrc,
  } = product

  const finalPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2)

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link to="/" className="breadcrumb-item">
            Inicio
          </Link>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <Link to="/libros" className="breadcrumb-item">
            Libros
          </Link>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-item active">{title}</span>
        </nav>

        <div className="product-main">
          <div className="product-image">
            <img
              src={product.imageSrc || product.cover || "/placeholder.svg?height=400&width=300"}
              alt={title}
              className="main-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{title}</h1>
            <p className="product-author">
              por <span>{author}</span>
            </p>

            <div className="product-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="rating-value">{rating.toFixed(1)}</span>
              <span className="rating-count">({reviewCount} reseñas)</span>
            </div>

            <div className="product-price">
              <span className="current-price">{finalPrice}€</span>
              {discount > 0 && (
                <>
                  <span className="original-price">{price.toFixed(2)}€</span>
                  <span className="discount-badge">-{discount}%</span>
                </>
              )}
              <p className="price-note">IVA incluido</p>
            </div>

            <div className="product-stock">
              {stock > 0 ? (
                <p className="in-stock">{stock > 10 ? "En stock" : `¡Solo quedan ${stock} unidades!`}</p>
              ) : (
                <p className="out-of-stock">Agotado</p>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)} disabled={quantity >= stock}>
                  <Plus size={16} />
                </button>
              </div>

              <div className="main-actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={stock === 0}>
                  <ShoppingBag size={20} />
                  Añadir al carrito
                </button>

                <button className="wishlist-btn">
                  <Heart size={20} />
                </button>

                <button className="share-btn">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="product-details">
              <h3 className="details-title">Detalles</h3>
              <ul className="details-list">
                <li className="details-item">
                  <span className="detail-label">Editorial:</span>
                  <span className="detail-value">{publisher}</span>
                </li>
                <li className="details-item">
                  <span className="detail-label">Fecha publicación:</span>
                  <span className="detail-value">{new Date(publishDate).toLocaleDateString()}</span>
                </li>
                <li className="details-item">
                  <span className="detail-label">Páginas:</span>
                  <span className="detail-value">{pages}</span>
                </li>
                <li className="details-item">
                  <span className="detail-label">ISBN:</span>
                  <span className="detail-value">{isbn}</span>
                </li>
                <li className="details-item">
                  <span className="detail-label">Idioma:</span>
                  <span className="detail-value">{language}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Descripción
            </button>
            <button
              className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Detalles
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reseñas ({reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-tab">
                <p>{description}</p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="details-tab">
                <div className="details-columns">
                  <div className="details-column">
                    <h3>Información del libro</h3>
                    <ul className="details-list-full">
                      <li>
                        <span>Título:</span>
                        <span>{title}</span>
                      </li>
                      <li>
                        <span>Autor:</span>
                        <span>{author}</span>
                      </li>
                      <li>
                        <span>Editorial:</span>
                        <span>{publisher}</span>
                      </li>
                      <li>
                        <span>Fecha de publicación:</span>
                        <span>{new Date(publishDate).toLocaleDateString()}</span>
                      </li>
                      <li>
                        <span>Idioma:</span>
                        <span>{language}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="details-column">
                    <h3>Detalles físicos</h3>
                    <ul className="details-list-full">
                      <li>
                        <span>Páginas:</span>
                        <span>{pages}</span>
                      </li>
                      <li>
                        <span>ISBN:</span>
                        <span>{isbn}</span>
                      </li>
                      <li>
                        <span>Formato:</span>
                        <span>Tapa blanda</span>
                      </li>
                      <li>
                        <span>Dimensiones:</span>
                        <span>15 x 21 cm</span>
                      </li>
                      <li>
                        <span>Peso:</span>
                        <span>350g</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab">
                <div className="reviews-summary">
                  <div className="rating-large">
                    <span className="rating-number">{rating.toFixed(1)}</span>
                    <div className="rating-stars-large">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
                          fill={i < Math.floor(rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="rating-count-large">Basado en {reviewCount} reseñas</span>
                  </div>
                </div>

                <p className="reviews-placeholder">Las reseñas se cargarán pronto...</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">También te puede interesar</h2>
            <div className="related-grid">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .product-detail-page {
          padding-bottom: var(--spacing-16);
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
        
        .not-found {
          text-align: center;
          padding: var(--spacing-12);
        }
        
        .breadcrumbs {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-6);
          flex-wrap: wrap;
        }
        
        .breadcrumb-item {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }
        
        .breadcrumb-item:not(.active):hover {
          color: var(--color-primary);
        }
        
        .breadcrumb-item.active {
          color: var(--color-text-primary);
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          margin: 0 var(--spacing-2);
          color: var(--color-text-tertiary);
        }
        
        .product-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
          margin-bottom: var(--spacing-12);
        }
        
        @media (min-width: 1024px) {
          .product-main {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .product-image {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        
        .main-image {
          max-width: 100%;
          max-height: 600px;
          object-fit: contain;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .product-title {
          font-size: 2rem;
          margin-bottom: var(--spacing-2);
        }
        
        .product-author {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-4);
        }
        
        .product-author span {
          font-weight: 500;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-6);
        }
        
        .rating-stars {
          display: flex;
          color: var(--color-warning);
        }
        
        .star-empty {
          color: var(--color-gray-300);
        }
        
        .rating-value {
          margin-left: var(--spacing-2);
          font-weight: 600;
        }
        
        .rating-count {
          margin-left: var(--spacing-2);
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
        }
        
        .product-price {
          margin-bottom: var(--spacing-6);
        }
        
        .current-price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        
        .original-price {
          margin-left: var(--spacing-3);
          font-size: 1.25rem;
          color: var(--color-text-tertiary);
          text-decoration: line-through;
        }
        
        .discount-badge {
          margin-left: var(--spacing-3);
          background-color: var(--color-danger);
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-full);
        }
        
        .price-note {
          font-size: 0.875rem;
          color: var(--color-text-tertiary);
          margin-top: var(--spacing-2);
        }
        
        .product-stock {
          margin-bottom: var(--spacing-6);
        }
        
        .in-stock {
          color: var(--color-success);
          font-weight: 600;
        }
        
        .out-of-stock {
          color: var(--color-danger);
          font-weight: 600;
        }
        
        .product-actions {
          margin-bottom: var(--spacing-8);
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }
        
        .quantity-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--color-border);
          background-color: white;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-value {
          width: 40px;
          text-align: center;
          font-weight: 600;
        }
        
        .main-actions {
          display: flex;
          gap: var(--spacing-3);
        }
        
        .add-to-cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3) var(--spacing-6);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
          flex: 1;
        }
        
        .add-to-cart-btn:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
        }
        
        .add-to-cart-btn:disabled {
          background-color: var(--color-gray-400);
          cursor: not-allowed;
        }
        
        .wishlist-btn, .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid var(--color-border);
          background-color: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .wishlist-btn:hover, .share-btn:hover {
          background-color: var(--color-gray-100);
          color: var(--color-primary);
        }
        
        .product-details {
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-6);
        }
        
        .details-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-4);
        }
        
        .details-list {
          display: grid;
          gap: var(--spacing-3);
        }
        
        .details-item {
          display: flex;
        }
        
        .detail-label {
          width: 150px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        
        .detail-value {
          color: var(--color-text-primary);
        }
        
        .product-tabs {
          margin-bottom: var(--spacing-12);
        }
        
        .tabs-header {
          display: flex;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--spacing-6);
        }
        
        .tab-btn {
          padding: var(--spacing-3) var(--spacing-6);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .tab-btn:hover {
          color: var(--color-primary);
        }
        
        .tab-btn.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
        
        .tab-content {
          background-color: white;
          padding: var(--spacing-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .description-tab p {
          line-height: 1.7;
          color: var(--color-text-primary);
        }
        
        .details-columns {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
        }
        
        @media (min-width: 768px) {
          .details-columns {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .details-column h3 {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-4);
          color: var(--color-primary);
        }
        
        .details-list-full {
          display: grid;
          gap: var(--spacing-3);
        }
        
        .details-list-full li {
          display: flex;
          justify-content: space-between;
          padding-bottom: var(--spacing-2);
          border-bottom: 1px solid var(--color-border-light);
        }
        
        .details-list-full li span:first-child {
          color: var(--color-text-secondary);
        }
        
        .details-list-full li span:last-child {
          font-weight: 500;
        }
        
        .reviews-summary {
          margin-bottom: var(--spacing-6);
        }
        
        .rating-large {
          display: flex;
          align-items: center;
        }
        
        .rating-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-right: var(--spacing-4);
        }
        
        .rating-stars-large {
          display: flex;
          color: var(--color-warning);
        }
        
        .rating-count-large {
          margin-left: var(--spacing-4);
          color: var(--color-text-secondary);
        }
        
        .reviews-placeholder {
          color: var(--color-text-tertiary);
          font-style: italic;
          text-align: center;
          padding: var(--spacing-8) 0;
        }
        
        .related-products {
          margin-top: var(--spacing-16);
        }
        
        .related-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: var(--spacing-6);
        }
        
        @media (min-width: 640px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .related-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default ProductDetailPage
