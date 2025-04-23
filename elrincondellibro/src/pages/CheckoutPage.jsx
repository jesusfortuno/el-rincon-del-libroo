"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart()
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
    clearCart()
  }

  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="empty-checkout">
        <div className="container">
          <div className="empty-checkout-content">
            <h2 className="empty-checkout-title">Tu carrito está vacío</h2>
            <p className="empty-checkout-message">Añade productos a tu carrito antes de proceder al pago.</p>
            <Link to="/" className="empty-checkout-button">
              <ArrowLeft size={18} className="button-icon" />
              Ir a la tienda
            </Link>
          </div>
        </div>

        <style jsx>{`
          .empty-checkout {
            padding: var(--spacing-12) 0;
          }
          
          .empty-checkout-content {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
          }
          
          .empty-checkout-title {
            font-size: 1.75rem;
            margin-bottom: var(--spacing-4);
            color: var(--color-text-primary);
          }
          
          .empty-checkout-message {
            margin-bottom: var(--spacing-8);
            color: var(--color-text-secondary);
          }
          
          .empty-checkout-button {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-2);
            padding: var(--spacing-3) var(--spacing-6);
            background-color: var(--color-primary);
            color: white;
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: all var(--transition-normal) ease;
          }
          
          .empty-checkout-button:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-2px);
          }
          
          .button-icon {
            transition: transform var(--transition-normal) ease;
          }
          
          .empty-checkout-button:hover .button-icon {
            transform: translateX(-3px);
          }
        `}</style>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="order-complete">
        <div className="container">
          <div className="order-complete-content">
            <div className="success-icon">
              <Check size={32} />
            </div>
            <h1 className="order-complete-title">¡Pedido completado con éxito!</h1>
            <p className="order-complete-message">
              Gracias por tu compra. Hemos enviado un correo electrónico de confirmación a {formData.email}.
            </p>
            <p className="order-number">
              Tu número de pedido es: <span>RL-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <Link to="/" className="order-complete-button">
              Volver a la tienda
            </Link>
          </div>
        </div>

        <style jsx>{`
          .order-complete {
            padding: var(--spacing-12) 0;
          }
          
          .order-complete-content {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
            background-color: white;
            border-radius: var(--radius-lg);
            padding: var(--spacing-8);
            box-shadow: var(--shadow-md);
          }
          
          .success-icon {
            width: 64px;
            height: 64px;
            background-color: var(--color-success);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto var(--spacing-6);
          }
          
          .order-complete-title {
            font-size: 1.75rem;
            margin-bottom: var(--spacing-4);
            color: var(--color-text-primary);
          }
          
          .order-complete-message {
            margin-bottom: var(--spacing-4);
            color: var(--color-text-secondary);
          }
          
          .order-number {
            margin-bottom: var(--spacing-8);
            color: var(--color-text-secondary);
          }
          
          .order-number span {
            font-weight: 600;
            color: var(--color-text-primary);
          }
          
          .order-complete-button {
            display: inline-flex;
            align-items: center;
            padding: var(--spacing-3) var(--spacing-6);
            background-color: var(--color-primary);
            color: white;
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: all var(--transition-normal) ease;
          }
          
          .order-complete-button:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="back-link">
          <Link to="/carrito" className="back-button">
            <ArrowLeft size={18} />
            <span>Volver al carrito</span>
          </Link>
        </div>

        <h1 className="page-title">Finalizar compra</h1>

        <div className="checkout-layout">
          <div className="checkout-main">
            <div className="checkout-card">
              {/* Progress Steps */}
              <div className="checkout-steps">
                <button onClick={() => setStep(1)} className={`step-button ${step === 1 ? "active" : ""}`}>
                  1. Datos de envío
                </button>
                <button
                  onClick={() => step > 1 && setStep(2)}
                  className={`step-button ${step === 2 ? "active" : ""} ${step < 2 ? "disabled" : ""}`}
                >
                  2. Método de pago
                </button>
              </div>

              <form onSubmit={handleSubmit} className="checkout-form">
                {step === 1 && (
                  <div className="form-step">
                    <h2 className="step-title">Información de envío</h2>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                          Nombre
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                          Apellidos
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address" className="form-label">
                        Dirección
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city" className="form-label">
                          Ciudad
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode" className="form-label">
                          Código postal
                        </label>
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="country" className="form-label">
                          País
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="form-select"
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

                    <div className="form-actions">
                      <button type="button" onClick={() => setStep(2)} className="btn-primary">
                        Continuar al pago
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-step">
                    <h2 className="step-title">Información de pago</h2>

                    <div className="payment-method">
                      <div className="payment-header">
                        <CreditCard size={24} className="payment-icon" />
                        <h3 className="payment-title">Tarjeta de crédito o débito</h3>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardName" className="form-label">
                          Nombre en la tarjeta
                        </label>
                        <input
                          id="cardName"
                          name="cardName"
                          type="text"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardNumber" className="form-label">
                          Número de tarjeta
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate" className="form-label">
                            Fecha de expiración
                          </label>
                          <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv" className="form-label">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                        Volver
                      </button>
                      <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? "Procesando..." : "Completar pedido"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-sidebar">
            <div className="summary-card">
              <h2 className="summary-title">Resumen del pedido</h2>

              <div className="order-items">
                {cart.map((item) => {
                  const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                  return (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.cover || "/placeholder.svg"} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <h3 className="item-title">{item.title}</h3>
                        <p className="item-author">{item.author}</p>
                        <div className="item-price-info">
                          <span className="item-quantity">{item.quantity} x</span>
                          <span className="item-price">{itemPrice.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>

                <div className="total-row">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}</span>
                </div>

                <div className="total-row final">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>

                <p className="tax-note">IVA incluido</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          padding-bottom: var(--spacing-16);
        }
        
        .back-link {
          margin-bottom: var(--spacing-6);
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          color: var(--color-primary);
          font-weight: 500;
          transition: all var(--transition-normal) ease;
        }
        
        .back-button:hover {
          color: var(--color-primary-dark);
        }
        
        .page-title {
          font-size: 2rem;
          position: relative;
          padding-bottom: var(--spacing-4);
          margin-bottom: var(--spacing-8);
        }
        
        .page-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--color-primary);
        }
        
        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-8);
        }
        
        @media (min-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 2fr 1fr;
          }
        }
        
        .checkout-card {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        
        .checkout-steps {
          display: flex;
          border-bottom: 1px solid var(--color-border-light);
        }
        
        .step-button {
          flex: 1;
          padding: var(--spacing-4);
          text-align: center;
          background: none;
          border: none;
          font-weight: 600;
          color: var(--color-text-secondary);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-normal) ease;
        }
        
        .step-button.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
        
        .step-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .checkout-form {
          padding: var(--spacing-6);
        }
        
        .step-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-6);
          color: var(--color-primary);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }
        
        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .form-row:last-of-type {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .form-group {
          margin-bottom: var(--spacing-4);
        }
        
        .form-label {
          display: block;
          margin-bottom: var(--spacing-2);
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .form-control, .form-select {
          width: 100%;
          padding: var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: all var(--transition-normal) ease;
        }
        
        .form-control:focus, .form-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(140, 94, 88, 0.2);
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: var(--spacing-4);
          margin-top: var(--spacing-8);
        }
        
        @media (max-width: 640px) {
          .form-actions {
            flex-direction: column;
          }
        }
        
        .btn-primary {
          flex: 1;
          padding: var(--spacing-3) var(--spacing-4);
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          padding: var(--spacing-3) var(--spacing-4);
          background-color: white;
          color: var(--color-text-primary);
          font-weight: 600;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal) ease;
        }
        
        .btn-secondary:hover {
          background-color: var(--color-gray-100);
        }
        
        .payment-method {
          background-color: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          padding: var(--spacing-6);
          margin-bottom: var(--spacing-6);
        }
        
        .payment-header {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }
        
        .payment-icon {
          color: var(--color-primary);
          margin-right: var(--spacing-2);
        }
        
        .payment-title {
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .summary-card {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-6);
          position: sticky;
          top: 90px;
        }
        
        .summary-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--color-border-light);
          color: var(--color-primary);
        }
        
        .order-items {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: var(--spacing-6);
          padding-right: var(--spacing-2);
        }
        
        .order-items::-webkit-scrollbar {
          width: 4px;
        }
        
        .order-items::-webkit-scrollbar-track {
          background: var(--color-gray-100);
        }
        
        .order-items::-webkit-scrollbar-thumb {
          background-color: var(--color-gray-400);
          border-radius: var(--radius-full);
        }
        
        .order-item {
          display: flex;
          padding: var(--spacing-3) 0;
          border-bottom: 1px solid var(--color-border-light);
        }
        
        .item-image {
          width: 48px;
          height: 64px;
          flex-shrink: 0;
          margin-right: var(--spacing-3);
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-md);
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-1);
          color: var(--color-text-primary);
        }
        
        .item-author {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-1);
        }
        
        .item-price-info {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }
        
        .item-quantity {
          color: var(--color-text-tertiary);
          margin-right: var(--spacing-1);
        }
        
        .item-price {
          font-weight: 600;
          color: var(--color-primary);
        }
        
        .order-totals {
          border-top: 1px solid var(--color-border-light);
          padding-top: var(--spacing-4);
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-3);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }
        
        .total-row.final {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-top: var(--spacing-4);
          padding-top: var(--spacing-3);
          border-top: 1px solid var(--color-border-light);
        }
        
        .tax-note {
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
          text-align: right;
          margin-top: var(--spacing-1);
        }
      `}</style>
    </div>
  )
}

export default CheckoutPage
