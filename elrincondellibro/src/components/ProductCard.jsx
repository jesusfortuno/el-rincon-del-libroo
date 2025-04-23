"use client"

import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Star } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { id, title, author, cover, price, discount, rating, reviewCount } = product

  const finalPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/producto/${id}`} className="product-image-link">
          <img src={cover || "/placeholder.svg?height=400&width=300"} alt={title} className="product-image" />
        </Link>

        {discount > 0 && <div className="product-badge">-{discount}%</div>}

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
          <h3 className="product-title">{title}</h3>
        </Link>

        <p className="product-author">{author}</p>

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="rating-count">({reviewCount})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{finalPrice}€</span>
          {discount > 0 && <span className="original-price">{price.toFixed(2)}€</span>}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal) ease;
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
          transition: transform var(--transition-normal) ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .product-badge {
          position: absolute;
          top: var(--spacing-3);
          right: var(--spacing-3);
          background-color: var(--color-danger);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-full);
          z-index: 1;
        }
        
        .product-actions {
          position: absolute;
          top: var(--spacing-3);
          left: var(--spacing-3);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
          opacity: 0;
          transform: translateX(-10px);
          transition: all var(--transition-normal) ease;
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
          background-color: white;
          color: var(--color-gray-800);
          border: none;
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .product-action-btn:hover {
          background-color: var(--color-primary);
          color: white;
        }
        
        .product-info {
          padding: var(--spacing-4);
        }
        
        .product-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-1);
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
          margin-bottom: var(--spacing-2);
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-2);
        }
        
        .rating-stars {
          display: flex;
          color: var(--color-warning);
        }
        
        .star-empty {
          color: var(--color-gray-300);
        }
        
        .rating-count {
          margin-left: var(--spacing-1);
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
          margin-left: var(--spacing-2);
          font-size: 0.875rem;
          color: var(--color-text-tertiary);
          text-decoration: line-through;
        }
      `}</style>
    </div>
  )
}

export default ProductCard
