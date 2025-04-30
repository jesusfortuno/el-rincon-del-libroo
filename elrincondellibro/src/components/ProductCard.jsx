"use client"

import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Star } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useTheme } from "../contexts/ThemeContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { darkMode } = useTheme()

  // Verificar si el producto existe
  if (!product) {
    return (
      <div className={`p-4 border rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>Producto no disponible</div>
    )
  }

  const { id, title, author, cover, price, discount, rating, review_count } = product

  // Valores por defecto para evitar errores
  const safeTitle = title || "Título no disponible"
  const safeAuthor = author || "Autor desconocido"
  const safePrice = price || 0
  const safeDiscount = discount || 0
  const safeRating = rating || 0
  const safeReviewCount = review_count || 0

  const finalPrice = safeDiscount ? (safePrice - (safePrice * safeDiscount) / 100).toFixed(2) : safePrice.toFixed(2)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  // Determine image source with fallback
  const imageSrc = product.imageSrc || product.cover || "/placeholder.svg?height=400&width=300"

  return (
    <div className={`product-card ${darkMode ? "dark" : ""}`}>
      <div className="product-image-container">
        <Link to={`/producto/${id}`} className="product-image-link">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={safeTitle}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.svg?height=400&width=300"
            }}
          />
        </Link>

        {safeDiscount > 0 && <div className="product-badge">-{safeDiscount}%</div>}

        <div className="product-actions">
          <button className="product-action-btn wishlist-btn" aria-label="Add to wishlist">
            <Heart size={18} />
          </button>
          <button className="product-action-btn cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <Link to={`/producto/${id}`} className="product-title-link">
          <h3 className="product-title">{safeTitle}</h3>
        </Link>

        <p className="product-author">{safeAuthor}</p>

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(safeRating) ? "star-filled" : "star-empty"}
                fill={i < Math.floor(safeRating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="rating-count">({safeReviewCount})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{finalPrice}€</span>
          {safeDiscount > 0 && <span className="original-price">{safePrice.toFixed(2)}€</span>}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background-color: var(--color-bg-primary);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .product-image-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 2/3;
        }
        
        .product-image-link {
          display: block;
          height: 100%;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .product-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background-color: var(--color-danger);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          z-index: 1;
        }
        
        .product-actions {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .product-card:hover .product-actions {
          opacity: 1;
          transform: translateX(0);
        }
        
        .product-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
          border: none;
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .product-action-btn:hover {
          background-color: var(--color-primary);
          color: white;
        }
        
        .product-info {
          padding: 1rem;
        }
        
        .product-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          height: 2.8em;
        }
        
        .product-author {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .rating-stars {
          display: flex;
          color: var(--color-warning);
        }
        
        .star-empty {
          color: var(--color-gray-300);
        }
        
        .rating-count {
          margin-left: 0.25rem;
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
        }
        
        .product-price {
          display: flex;
          align-items: center;
        }
        
        .current-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        
        .original-price {
          margin-left: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-tertiary);
          text-decoration: line-through;
        }
      `}</style>
    </div>
  )
}

export default ProductCard
