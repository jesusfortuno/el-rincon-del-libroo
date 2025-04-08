"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import "./cart.css";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const navigate = useNavigate()

  const handleCouponSubmit = (e) => {
    e.preventDefault()

    // Simulación de validación de cupón
    if (couponCode.toLowerCase() === "descuento10") {
      setCouponApplied(true)
      setCouponDiscount(10)
    } else {
      alert("Cupón no válido")
    }
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
      return total + itemPrice * item.quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal > 50 ? 0 : 4.99
  const couponAmount = couponApplied ? (subtotal * couponDiscount) / 100 : 0
  const total = subtotal + shipping - couponAmount

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido ningún producto a tu carrito.</p>
          <Link
            to="/"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Producto</th>
                    <th className="text-center pb-4">Cantidad</th>
                    <th className="text-right pb-4">Precio</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                    return (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              src={item.cover || "/placeholder.svg"}
                              alt={item.title}
                              className="w-16 h-20 object-cover rounded mr-4 hidden sm:block"
                            />
                            <div>
                              <h3 className="font-medium text-gray-800">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-md border text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-md border text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          {item.discount ? (
                            <div>
                              <span className="text-primary font-medium">{itemPrice.toFixed(2)}€</span>
                              <span className="text-sm text-gray-500 line-through ml-1">{item.price.toFixed(2)}€</span>
                            </div>
                          ) : (
                            <span className="text-gray-800">{itemPrice.toFixed(2)}€</span>
                          )}
                        </td>
                        <td className="py-4 text-right font-medium">{(itemPrice * item.quantity).toFixed(2)}€</td>
                        <td className="py-4 text-right">
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft size={18} className="mr-1" />
              Continuar comprando
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen del pedido</h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)}€</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between border-b pb-4 text-green-600">
                  <span>Descuento ({couponDiscount}%)</span>
                  <span>-{couponAmount.toFixed(2)}€</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>

              {/* Coupon Code */}
              <div className="mt-4">
                <form onSubmit={handleCouponSubmit} className="flex">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors"
              >
                Proceder al pago
              </button>

              <div className="text-xs text-gray-500 mt-4">
                <p>* Los precios incluyen IVA.</p>
                <p>* Envío gratuito para pedidos superiores a 50€.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

