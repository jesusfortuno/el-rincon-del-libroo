"use client"

import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

const ProductCard = ({ product, addToCart }) => {
  const { id, title, author, cover, price, discount } = product

  const finalPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/producto/${id}`}>
        <img src={cover || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
      </Link>

      <div className="p-4">
        <Link to={`/producto/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary truncate">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{author}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {discount ? (
              <>
                <span className="text-lg font-bold text-primary">{finalPrice}€</span>
                <span className="text-sm text-gray-500 line-through ml-2">{price.toFixed(2)}€</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">{finalPrice}€</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

