"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CreditCard, Check } from "lucide-react"

const Checkout = ({ cart }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setOrderComplete(true)
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
      return total + itemPrice * item.quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Pedido completado con éxito!</h1>
          <p className="text-gray-600 mb-8">
            Gracias por tu compra. Hemos enviado un correo electrónico de confirmación a {formData.email}.
          </p>
          <p className="text-gray-600 mb-8">
            Tu número de pedido es: <span className="font-medium">RL-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
            Volver a la tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/carrito" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft size={18} className="mr-1" />
          Volver al carrito
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Progress Steps */}
            <div className="flex border-b">
              <button
                onClick={() => setStep(1)}
                className={`flex-1 py-4 text-center font-medium ${
                  step === 1 ? "text-primary border-b-2 border-primary" : "text-gray-500"
                }`}
              >
                1. Datos de envío
              </button>
              <button
                onClick={() => step > 1 && setStep(2)}
                className={`flex-1 py-4 text-center font-medium ${
                  step === 2 ? "text-primary border-b-2 border-primary" : "text-gray-500"
                } ${step < 2 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                2. Método de pago
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de envío</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellidos
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Código postal
                      </label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        País
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="España">España</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Francia">Francia</option>
                        <option value="Italia">Italia</option>
                        <option value="Alemania">Alemania</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Continuar al pago
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de pago</h2>

                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <div className="flex items-center mb-4">
                      <CreditCard size={24} className="text-gray-600 mr-2" />
                      <h3 className="font-medium">Tarjeta de crédito o débito</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre en la tarjeta
                        </label>
                        <input
                          id="cardName"
                          name="cardName"
                          type="text"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Número de tarjeta
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de expiración
                          </label>
                          <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Procesando..." : "Completar pedido"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen del pedido</h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => {
                const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                return (
                  <div key={item.id} className="flex py-3 border-b">
                    <div className="w-16 h-20 flex-shrink-0">
                      <img
                        src={item.cover || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.author}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">
                          {item.quantity} x {itemPrice.toFixed(2)}€
                        </span>
                        <span className="text-sm font-medium">{(itemPrice * item.quantity).toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-3 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}</span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

