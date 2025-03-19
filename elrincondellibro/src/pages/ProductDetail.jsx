"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from "lucide-react"
import { fetchProductById, fetchRelatedProducts } from "../services/api"
import ProductCard from "../components/ProductCard"

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams()
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

        const related = await fetchRelatedProducts(productData.category, productData.id)
        setRelatedProducts(related)

        setLoading(false)
      } catch (error) {
        console.error("Error loading product:", error)
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
        <p className="text-gray-600 mb-6">Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
          Volver a la página principal
        </Link>
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
    publishDate,
    pages,
    isbn,
    language,
    rating,
    reviewCount,
    stock,
  } = product

  const finalPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">
          Inicio
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link to="/libros" className="text-gray-500 hover:text-primary">
          Libros
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-800 font-medium truncate">{title}</span>
      </nav>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img src={cover || "/placeholder.svg"} alt={title} className="w-full max-w-md rounded-md object-contain" />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-lg text-gray-600 mb-4">
              por <span className="font-medium">{author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({reviewCount} reseñas)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {discount ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary">{finalPrice}€</span>
                  <span className="text-lg text-gray-500 line-through ml-3">{price.toFixed(2)}€</span>
                  <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">{finalPrice}€</span>
              )}
              <p className="text-sm text-gray-500 mt-1">IVA incluido</p>
            </div>

            {/* Stock */}
            <div className="mb-6">
              {stock > 0 ? (
                <p className="text-green-600 font-medium">
                  {stock > 10 ? "En stock" : `¡Solo quedan ${stock} unidades!`}
                </p>
              ) : (
                <p className="text-red-600 font-medium">Agotado</p>
              )}
            </div>

            {/* Add to cart */}
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="sr-only">
                  Cantidad
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 p-2 border rounded-md text-center"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`flex items-center px-6 py-3 rounded-md ${
                  stock > 0
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <ShoppingCart size={18} className="mr-2" />
                Añadir al carrito
              </button>

              <button className="ml-3 p-3 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Heart size={18} />
              </button>

              <button className="ml-3 p-3 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            {/* Quick details */}
            <div className="border-t pt-4">
              <ul className="space-y-2 text-sm">
                <li className="flex">
                  <span className="font-medium w-32">Editorial:</span>
                  <span className="text-gray-600">{publisher}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Fecha publicación:</span>
                  <span className="text-gray-600">{new Date(publishDate).toLocaleDateString()}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Páginas:</span>
                  <span className="text-gray-600">{pages}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">ISBN:</span>
                  <span className="text-gray-600">{isbn}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Idioma:</span>
                  <span className="text-gray-600">{language}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "details" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "reviews" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reseñas ({reviewCount})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{description}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Información del libro</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Título:</span>
                    <span>{title}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Autor:</span>
                    <span>{author}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Editorial:</span>
                    <span>{publisher}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fecha de publicación:</span>
                    <span>{new Date(publishDate).toLocaleDateString()}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Idioma:</span>
                    <span>{language}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Detalles físicos</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Páginas:</span>
                    <span>{pages}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">ISBN:</span>
                    <span>{isbn}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Formato:</span>
                    <span>Tapa blanda</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Dimensiones:</span>
                    <span>15 x 21 cm</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Peso:</span>
                    <span>350g</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-2">{rating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                <span className="ml-4 text-gray-600">Basado en {reviewCount} reseñas</span>
              </div>

              <p className="text-gray-500 italic">Las reseñas se cargarán pronto...</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail

